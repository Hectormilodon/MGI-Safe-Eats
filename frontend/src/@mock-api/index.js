import "./api/auth-api";
import "./api/notifications-api";
import history from "@history";
import mock from "./mock";
import "./api/countries-api";
import "./api/contacts-api";
import "./api/companies-api";
import "./api/companies-tags-api";
import "./api/chat-api";

mock.onAny().passThrough();

if (module?.hot?.status() === "apply") {
	const { pathname } = history.location;
	history.push("/loading");
	history.push({ pathname });
}
