import React, { useState } from "react";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.css";
import {
	ApiClasification,
	endpoints_clasification,
} from "src/app/api/clasificationApi";
import { ApiQuestion, endpoints_question } from "src/app/api/questionApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ApiInputValue,
  ApiLocalAdmin,
  ApiUserAdmin,
  ApiPredictiveModel,
  endpoints_inputValue,
  endpoints_userAdmin,
  endpoints_localAdmin,
  endpoints_predictive_model
} from "../../../api";
import { useParams } from "react-router-dom";
import { ApiReport, endpoints_report } from "../../../api";
import { Button } from "@mui/material";
import { selectUser } from "../../../store/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/base";
import DeleteIcon from "@mui/icons-material/Delete";
import { truncate } from "lodash";
import axios from "axios";
import { ApiAlert, endpoints_alerts } from "app/api/alertsApi";

// register Handsontable's modules
registerAllModules();

const notifyAddOk = () =>
  toast.success("Auditoria creada con exito", {
    position: "top-center",
    autoClose: 1000,
  });

const notifyUpdateOk = () =>
  toast.success("Auditoria actualizada con exito", {
    position: "top-center",
    autoClose: 1000,
  });

const notifyModelError = () => {
  toast.error("Error al cargar BPM para alertas", {
    position: "top-center",
    autoClose: 1000
  })
}

const notifyModelSuccess = () => {
  toast.success("BPM enviada a modelo predictivo con exito", {
    position: "top-center",
    autoClose: 1000
  })
}

const NewReport = (props) => {
	const { reportId } = props;
	const [clasification, setClasification] = React.useState([]);
	const [question, setQuestion] = React.useState([]);
	const [inputValues, setInputValues] = React.useState([]);
	const [report, setReport] = React.useState();

	const [openDelete, setOpenDelete] = useState(false);

	const hotRef = React.useRef(null);

	const params = useParams();
	const navigate = useNavigate();

	const user = useSelector(selectUser);

	const apiClasification = new ApiClasification();
	const apiQuestion = new ApiQuestion();
	const apiInputValue = new ApiInputValue();
	const apiReport = new ApiReport();
	const apiUsers = new ApiUserAdmin();
  const apiLocal = new ApiLocalAdmin();
  const apiPredictiveModel = new ApiPredictiveModel();
  const apiAlert = new ApiAlert();

  const createInputValues = (reportId) => {
    let dataInputValues = [];
    question.map((quest) => {
      const newDataInputValues = {
        clasification_id: quest.clasification_id,
        question_id: quest.id,
        question: quest.value,
        score: null,
        value: null,
        obs: null,
        report_id: reportId
      }
      dataInputValues.push(newDataInputValues);
      
      dataInputValues = dataInputValues.filter((inputValue) => inputValue.question !== "porcentaje total,");
      dataInputValues = dataInputValues.filter((inputValue) => inputValue.question !== "porcentaje total");
		});
    dataInputValues.forEach((inputValue) => {
      updateInputValue(inputValue);
    })
  }

  const getReport = async () => {
    if (params.reportId) {
      const report = await apiReport.get(
        endpoints_report.REPORT,
        params.reportId
      );
      setReport(report);
    } else if (reportId) {
      const report = await apiReport.get(endpoints_report.REPORT, reportId);
      createInputValues(reportId)
      setReport(report);
    }
  };

  const handleClickCloseDelete = () => {
    setOpenDelete(false);
  };

	const getInputValues = async () => {
		const inputValues = await apiInputValue.get(
			endpoints_inputValue.BYREPORT,
			params.reportId
		);
		setInputValues(inputValues);
	};

	const getQuestions = async () => {
		try {
			const response = await apiQuestion.get(endpoints_question.QUESTION);
			response.sort(
				(firstObject, secondObject) => firstObject.id - secondObject.id
			);
			setQuestion(response);
		} catch (err) {
			return [];
		}
	};

	const getClasification = async () => {
		try {
			const response = await apiClasification.get(
				endpoints_clasification.CLASIFICATION
			);
			setClasification(response);
		} catch (err) {
			return [];
		}
	};

	let buttonClickCallback;

	React.useEffect(() => {
		getQuestions();
		getClasification();
		if (params.reportId) {
      getInputValues();
		}
	}, []);
  
  React.useEffect(() => {
    getReport();
  }, [reportId])

	React.useEffect(() => {
		const hot = hotRef.current.hotInstance;

		const exportPlugin = hot.getPlugin("exportFile");
		buttonClickCallback = (args) => {
			exportPlugin.downloadFile("csv", {
				bom: truncate,
				columnHeaders: true,
				exportHiddenColumns: true,
				exportHiddenRows: true,
				charset: "utf-8",
				fileExtension: "csv",
				filename: "Reporte_N°_" + params.reportId + "_[YYYY]-[MM]-[DD]",
				mimeType: "text/csv",
				rowDelimiter: "\r\n",
				// columnDelimiter: ';',
        renderAllRows: true,
			});
		};
	});

	let canDownload = false;
	let canSave = false;
	let readOnly = true;

	if (report) {
		if (
			report.status_id == 2 ||
			report.status_id == 1 ||
			report.status_id == 3 ||
			user.data.rol_id == 1 ||
			user.data.rol_id == 2 ||
			user.data.rol_id == 4
		) {
			readOnly = true;
			canDownload = true;
		} else {
			canDownload = false;
			readOnly = false;
		}
		if (report.status_id == 4) {
			canSave = true;
		}
	} else {
		readOnly = false;
		canSave = true;
	}

	const verifyInputValue = async (data, reportId, questionId) => {
		const inputValueSearchers = {
			report_id: reportId,
			question_id: questionId,
		};
		const getInputValue = await apiInputValue.post(
			endpoints_inputValue.REPORTQUESTION,
			inputValueSearchers
		);

		if (getInputValue.length == 0) {
			updateInputValue(data);
		} else {
			const inputValueId = getInputValue.id;
			if (!data.value) {
				data.value = getInputValue.value;
			} else if (!data.obs) {
				data.obs = getInputValue.obs;
			}
			updateInputValue(data, inputValueId);
		}
	};

	const updateInputValue = async (data, inputValueId) => {
		if (inputValueId) {
			await apiInputValue.put(
				endpoints_inputValue.INPUTVALUE,
				inputValueId,
				data
			);
		} else {
			await apiInputValue.post(endpoints_inputValue.INPUTVALUE, data);
		}
	};

  const calculatePercentage = (
    inputValues,
    clasificationId,
    lastQuestionId
  ) => {
    const inputValuesByClasification = inputValues.filter(
      (input) =>
        input.clasification_id === clasificationId &&
        input.question_id !== lastQuestionId
    );
    const questionsByClasification = inputValues.filter(
      (input) =>
        input.clasification_id === clasificationId &&
        input.id !== lastQuestionId
    );
    const maxScore = questionsByClasification.length * 2;
    let obtainedScore = 0;

    inputValuesByClasification.forEach((inputValue) => {
        obtainedScore = obtainedScore + Number(inputValue.score)
    });

    if (obtainedScore === 0) {
      return 0;
    }

    const divisionScore = obtainedScore / maxScore;
    const percentageObtained = divisionScore * 100;
    const totalPercentage = Math.floor(percentageObtained);

    return totalPercentage;
  };

  const getAndUpdateInputValue = async (reportId, questionId, percentage, clasificationId) => {
    const inputValueSearchers = {
      report_id: reportId,
      question_id: questionId,
    };

    const getInputValue = await apiInputValue.post(
      endpoints_inputValue.REPORTQUESTION,
      inputValueSearchers
    );

    const data = {
        question_id: questionId,
        score: percentage + "%",
        clasification_id: clasificationId,
        report_id: reportId,
    }
    if (getInputValue.length == 0) {
      updateInputValue(data);
    } else {
      updateInputValue(data, getInputValue.id);
    }
  }

  const saveReport = async () => {
    const users = await apiUsers.get(endpoints_userAdmin.ADMINUSERS);
    const supervisors = users.filter((user) => user.rol_id == 2);
    const supervisor =
      supervisors[Math.floor(Math.random() * supervisors.length)];

    let instalationsPercentage;
    let controlPestsPercentage;
    let personalCarePercentage;
    let trainingPercentage;
    let rawMaterialPercentage;
    let processesPercentage;
    let cleaningPercentage;

    if (report) {
      const inputValues = await apiInputValue.get(
        endpoints_inputValue.BYREPORT,
        report.id
      );
      const localId = params.id;
      
      const local = await apiLocal.get(endpoints_localAdmin.LOCAL_BY_ID(localId))

      if(local.premium === true){
        let dataInputValues = [];
        const modelData = [];
        
        dataInputValues = inputValues.filter((inputValue) => inputValue.question_id != 17);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 22);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 26);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 30);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 33);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 39);
        dataInputValues = dataInputValues.filter((inputValue) => inputValue.question_id != 46);

        dataInputValues.map(inputValue => {
          modelData.push(inputValue.obs);
          modelData.push(inputValue.value);
          modelData.push(inputValue.score);
        })
        const alerts = await apiPredictiveModel.post(endpoints_predictive_model.GET_REPORT, {
          "param_list": modelData
        })
        if(alerts.status !== "500" && alerts.status !== null){
          console.log(alerts)
          const alertPayload = {
            local_id: local.id,
            report_id: report.id,
            breach_alert: alerts.breach_alert,
            threashold_alert: alerts.threshold_alert.toString(),
            suggestions: alerts.suggestions
          }
          const newAlerts = await apiPredictiveModel.post(endpoints_predictive_model.POST_ALERT, alertPayload)
          notifyModelSuccess()
        } else {
          notifyModelError()
        }
      }

      clasification.map((clas) => {
        if (clas.id === 1) {
          instalationsPercentage = calculatePercentage(
            inputValues,
            clas.id,
            17
          );
        } else if (clas.id === 2) {
          controlPestsPercentage = calculatePercentage(
            inputValues,
            clas.id,
            22
          );
        } else if (clas.id === 3) {
          personalCarePercentage = calculatePercentage(
            inputValues,
            clas.id,
            26
          );
        } else if (clas.id === 4) {
          trainingPercentage = calculatePercentage(inputValues, clas.id, 30);
        } else if (clas.id === 5) {
          rawMaterialPercentage = calculatePercentage(inputValues, clas.id, 33);
        } else if (clas.id === 6) {
          processesPercentage = calculatePercentage(inputValues, clas.id, 39);
        } else if (clas.id === 7) {
          cleaningPercentage = calculatePercentage(inputValues, clas.id, 46);
        }
      });

      const sumPercentages =
        instalationsPercentage +
        controlPestsPercentage +
        personalCarePercentage +
        trainingPercentage +
        rawMaterialPercentage +
        processesPercentage +
        cleaningPercentage;

      let totalPercentage = sumPercentages / clasification.length;

      totalPercentage = totalPercentage.toFixed(2);

      totalPercentage = totalPercentage + "%";

      getAndUpdateInputValue(report.id, 17, instalationsPercentage, 1)
      getAndUpdateInputValue(report.id, 22, controlPestsPercentage, 2)
      getAndUpdateInputValue(report.id, 26, personalCarePercentage, 3)
      getAndUpdateInputValue(report.id, 30, trainingPercentage, 4)
      getAndUpdateInputValue(report.id, 33, rawMaterialPercentage, 5)
      getAndUpdateInputValue(report.id, 39, processesPercentage, 6)
      getAndUpdateInputValue(report.id, 46, cleaningPercentage, 7)

      await apiReport.put(endpoints_report.REPORT, report.id, {
        compliance: totalPercentage,
        status_id: 1,
        supervisor_id: supervisor.id,
      });

      notifyUpdateOk();
    } else {
      const inputValues = await apiInputValue.get(
        endpoints_inputValue.BYREPORT,
        reportId
      );

      clasification.map((clas) => {
        if (clas.id === 1) {
          instalationsPercentage = calculatePercentage(
            inputValues,
            clas.id,
            17
          );
        } else if (clas.id === 2) {
          controlPestsPercentage = calculatePercentage(
            inputValues,
            clas.id,
            22
          );
        } else if (clas.id === 3) {
          personalCarePercentage = calculatePercentage(
            inputValues,
            clas.id,
            26
          );
        } else if (clas.id === 4) {
          trainingPercentage = calculatePercentage(inputValues, clas.id, 30);
        } else if (clas.id === 5) {
          rawMaterialPercentage = calculatePercentage(inputValues, clas.id, 33);
        } else if (clas.id === 6) {
          processesPercentage = calculatePercentage(inputValues, clas.id, 39);
        } else if (clas.id === 7) {
          cleaningPercentage = calculatePercentage(inputValues, clas.id, 46);
        }
      });

      const sumPercentages =
        instalationsPercentage +
        controlPestsPercentage +
        personalCarePercentage +
        trainingPercentage +
        rawMaterialPercentage +
        processesPercentage +
        cleaningPercentage;

      let totalPercentage = sumPercentages / clasification.length;

      totalPercentage = totalPercentage.toFixed(2);

      totalPercentage = totalPercentage + "%";

      getAndUpdateInputValue(reportId, 17, instalationsPercentage, 1)
      getAndUpdateInputValue(reportId, 22, controlPestsPercentage, 2)
      getAndUpdateInputValue(reportId, 26, personalCarePercentage, 3)
      getAndUpdateInputValue(reportId, 30, trainingPercentage, 4)
      getAndUpdateInputValue(reportId, 33, rawMaterialPercentage, 5)
      getAndUpdateInputValue(reportId, 39, processesPercentage, 6)
      getAndUpdateInputValue(reportId, 46, cleaningPercentage, 7)

      const updatedReport = await apiReport.put(endpoints_report.REPORT, reportId, {
        compliance: totalPercentage,
        status_id: 1,
        supervisor_id: supervisor.id,
      });

      notifyUpdateOk();
    }
  };

  const aproveReport = async () => {
    await apiReport.put(endpoints_report.REPORT, report.id, {
      status_id: 2,
    });
    navigate("/reportsSupervisor");
  };

  const initialData = () => {
    const data = [];
    question.map((quest) => {
      let clasificationName = "";
      clasification.forEach((clas) => {
        if (quest.clasification_id === clas.id) clasificationName = `${clas.id}.- ${clas.name}`
      });
      const questionValue = `${quest.id}.- ${quest.value}`
      const newData = {
        clasification: clasificationName,
        question: questionValue,
        score: quest.score,
        value: null,
        obs: null,
      };

      if (inputValues) {
        inputValues.forEach((inputValue) => {
          if (inputValue.question_id === quest.id) {
            newData.value = inputValue.value;
            newData.obs = inputValue.obs;
            newData.score = inputValue.score;
          }
        });
      }

			if (inputValues) {
				inputValues.forEach((inputValue) => {
					if (inputValue.question_id === quest.id) {
						newData.value = inputValue.value;
						newData.obs = inputValue.obs;
					}
				});
			}
			data.push(newData);
		});
		return data;
	};
	const handleClickOpenDelete = () => {
		setOpenDelete(true);
	};

  const handleRemoveInput = async () => {
    report.refused = refused.value;
    await apiReport.put(endpoints_report.REPORT, report.id, {
      status_id: 3,
      refused: report.refused,
    });
    navigate("/reportsSupervisor");
  };

  return (
    <>
      <div
        className="controls"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "5px",
          marginRight: "30px",
        }}
      >
        {canDownload && report.status_id !== 4 ? (
          <Button
            onClick={(...args) => buttonClickCallback(...args)}
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
          >
            Descargar
          </Button>
        ) : (
          <></>
        )}
        {user.data.rol_id == 2 && report && report.status_id == 1 ? (
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={aproveReport}
            >
              Aprobar Auditoría
            </Button>
            <Button
              //onClick={rejectReport}
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={handleClickOpenDelete}
            >
              Rechazar Auditoría
            </Button>
            <Dialog
              open={openDelete}
              onClose={handleClickCloseDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                ¿Estás seguro que deseas rechazar la auditoria?
              </DialogTitle>
              <TextareaAutosize
                style={{
                  width: "95%",
                  margin: "10px",
                  fontSize: "1.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  resize: "vertical",
                  minHeight: "100px",
                  maxHeight: "100px",
                }}
                id="refused"
                rowsMin={3}
                placeholder="Motivo"
              />
              <DialogActions>
                <Button onClick={handleClickCloseDelete}>Cancelar</Button>
                <Button
                  onClick={handleRemoveInput}
                  color="error"
                  autoFocus
                  startIcon={<DeleteIcon />}
                >
                  {" "}
                  Rechazar{" "}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <></>
        )}
      </div>
      <HotTable
        ref={hotRef}
        data={initialData()}
        dataSchema={{
          clasifitacion: null,
          question: null,
          value: null,
          score: null,
          obs: null,
        }}
        filters={true}
        dropdownMenu={{
          items: {
            filter_by_value: {
              // hide the 'Filter by value' list from all columns but the first one
              hidden() {
                return this.getSelectedRangeLast().to.col > 0;
              },
            },
            filter_action_bar: {
              // hide the 'OK' and 'Cancel' buttons from all columns but the first one
              hidden() {
                return this.getSelectedRangeLast().to.col > 0;
              },
            },
          },
        }}
        startCols={4}
        colHeaders={[
          "Clasificacion,",
          "Punto a revisar,",
          "P(x),",
          "Puntaje,",
          "Observaciones,",
        ]}
        height="auto"
        columns={[
          { data: "clasification" },
          { data: "question" },
          { data: "value" },
          { data: "score", type: 'numeric' },
          { data: "obs" },
        ]}
        // beforeKeyDown={(event) => {
          // var reg = /^\d+$/;
          // if(event.key !== "Backspace"){
          //   if (!reg.test(event.key)) {
          //     event.preventDefault()
          //   }
          // }
        // }}
        afterChange={function (change, source) {
          if (source === "loadData") {
            return; //don't save this change
          }

          let value = null;
          let obs = null;
          let score = null;

          if (change && change.length > 0) {
            const questionId = change[0][0] + 1;

            if (change[0][1] === "value") {
              value = change[0][3];
            } else if (change[0][1] === "obs") {
              obs = change[0][3];
            } else if (change[0][1] === "score") {
              score = change[0][3];
            }

            const questionSelected = question.filter(
              (ques) => ques.id === questionId
            );
            let data = {};
            let idReport;
            if (reportId) {
              idReport = reportId;
            } else {
              idReport = report.id;
            }

            if (value) {
              data = {
                question_id: questionId,
                value: value,
                clasification_id: questionSelected[0].clasification_id,
                report_id: idReport,
              };
            } else if (obs) {
              data = {
                question_id: change[0][0] + 1,
                obs: obs,
                clasification_id: questionSelected[0].clasification_id,
                report_id: idReport,
              };
            } else if (score) {
              data = {
                question_id: change[0][0] + 1,
                score: score,
                clasification_id: questionSelected[0].clasification_id,
                report_id: idReport,
              };
            }
            verifyInputValue(data, idReport, questionId);
          }
        }}
        width="100%"
        getPlugin="exportFile"
        colWidths={[150, 350, 100, 50, 350]}
        readOnly={readOnly}
        licenseKey="non-commercial-and-evaluation"
      />
      <div>
      {canSave ? (
          <Button
            onClick={saveReport}
            variant="contained"
            color="primary"
            style={{ margin: "5px" /* ,width: "50%"*/}}
          >
            Guardar
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewReport;
