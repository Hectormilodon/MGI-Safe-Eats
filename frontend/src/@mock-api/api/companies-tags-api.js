import _ from "@lodash";
import FuseUtils from "@fuse/utils";
import mockApi from "../mock-api.json";
import mock from "../mock";

const companiesTagsDB = mockApi.components.examples.companies_tags.value;

mock.onGet("/api/companiesTags").reply((config) => {
  return [200, companiesTagsDB];
});

mock.onPost("/api/companiesTags").reply(({ data }) => {
  const newCompaniesTag = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };

  companiesTagsDB.push(newCompaniesTag);

  return [200, newCompaniesTag];
});

mock.onGet(/\/api\/companiesTags\/(?!companiesTags)[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/companiesTags\/(?<id>[^/]+)/).groups;
  const ompaniesTag = _.find(companiesTagsDB, { id });

  if (ompaniesTag) {
    return [200, ompaniesTag];
  }

  return [404, "Requested task do not exist."];
});

mock.onPut(/\/api\/companiesTags\/[^/]+/).reply(({ url, data }) => {
  const { id } = url.match(/\/api\/companiesTags\/(?<id>[^/]+)/).groups;

  _.assign(_.find(companiesTagsDB, { id }), JSON.parse(data));

  return [200, _.find(companiesTagsDB, { id })];
});

mock.onDelete(/\/api\/companiesTags\/[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/companiesTags\/(?<id>[^/]+)/).groups;

  _.remove(companiesTagsDB, { id });

  return [200, id];
});
