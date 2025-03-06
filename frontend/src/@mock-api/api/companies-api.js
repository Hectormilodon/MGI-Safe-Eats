import _ from "@lodash";
import FuseUtils from "@fuse/utils";
import mockApi from "../mock-api.json";
import mock from "../mock";

const companiesDB = mockApi.components.examples.companies.value;
const tagsDB = mockApi.components.examples.contacts_tags.value;

mock.onGet("/api/companies").reply((config) => {
  return [200, companiesDB];
});

mock.onPost("/api/companies").reply(({ data }) => {
  const newCompany = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };

  companiesDB.push(newCompany);

  return [200, newCompany];
});

mock.onGet(/\/api\/companies\/(?!tags)[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/companies\/(?<id>[^/]+)/).groups;
  const company = _.find(companiesDB, { id });

  if (company) {
    return [200, company];
  }

  return [404, "Requested task do not exist."];
});

mock.onPut(/\/api\/companies\/[^/]+/).reply(({ url, data }) => {
  const { id } = url.match(/\/api\/companies\/(?<id>[^/]+)/).groups;

  _.assign(_.find(companiesDB, { id }), JSON.parse(data));

  return [200, _.find(companiesDB, { id })];
});

mock.onDelete(/\/api\/companies\/[^/]+/).reply((config) => {
  const { id } = config.url.match(/\/api\/companies\/(?<id>[^/]+)/).groups;

  _.remove(companiesDB, { id });

  return [200, id];
});

mock.onGet("/api/companies/tags").reply((config) => {
  return [200, tagsDB];
});
