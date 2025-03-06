import { memo } from "react";
import  { useEffect, useState } from "react";
import { sampleReportUrl } from "./Const.js";

import { PowerBIEmbed } from "powerbi-client-react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import FuseLoading from "@fuse/core/FuseLoading";
import "./Test.css"



function DemoContent() {

  

  // PowerBI Report object (to be received via callback)
  const [report, setReport] = useState();

  // Track Report embedding status
  const [isEmbedded, setIsEmbedded] = useState(false);

  // Overall status message of embedding
  const [displayMessage, setMessage] = useState(`Click para setear reporte`);

  // CSS Class to be passed to the embedded component
   const reportClass = "report-container";

  const [sampleReportConfig, setReportConfig] = useState({
    type: "report",
    embedUrl: undefined,
    tokenType: models.TokenType.Embed,
    accessToken: undefined,
    settings: undefined,
  });

  const [eventHandlersMap, setEventHandlersMap] = useState(
    new Map([
      ["loaded", () => console.log("Report has loaded")],
      ["rendered", () => console.log("Report has rendered")],
      [
        "error",
        (event) => {
          if (event) {
            console.error(event.detail);
          }
        },
      ],
      ["visualClicked", () => console.log("visual clicked")],
      ["pageChanged", (event) => console.log(event)],
    ])
  );

  useEffect(() => {
    const idReport = "09db4cca-63d5-47bb-be60-b85dd33c097e";
    embedReport(idReport)
    
  }, []);

  const embedReport = async (idReport) => {
    console.log("Embed Report clicked");

    // Get the embed config fro
    
    
    const reportConfigResponse = await api.get(endpoints_reportingApi.generateEmbededToken(idReport));

    // Update the reportConfig to embed the PowerBI report
    setReportConfig({
      ...sampleReportConfig,
      embedUrl: reportConfigResponse.embedUrl,
      accessToken: reportConfigResponse.token,
    });
    setIsEmbedded(true);

    // Update the display message
  };
  

  const reportComponent = (
    <PowerBIEmbed
      embedConfig={sampleReportConfig}
      eventHandlers={eventHandlersMap}
      cssClassName={reportClass}
      getEmbeddedComponent={(embedObject) => {
        console.log(`Embedded object of type "${embedObject.embedtype}" received`);
        setReport(embedObject);
      }}
    />
  );


  if (!isEmbedded) {
    return <FuseLoading />;
  }

  return (
    <div>
      {isEmbedded ? reportComponent : null}
  </div>
  );
}

export default memo(DemoContent);
