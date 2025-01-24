const dotenv = require("dotenv");

dotenv.config();

module.exports = [
    {
        repository: "tcd-app",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_APP_TAG
    },
    {
        repository: "tcd-api",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_API_TAG
    },
    {
        repository: "tcd-alert",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_ALERT_TAG
    },
    {
        repository: "tcd-schedule",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_SCHEDULE_TAG
    },
    {
        repository: "tcd-iot-axione",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_IOT_AXIONE_TAG
    },
    {
        repository: "tcd-iot-axione-downlink",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_IOT_AXIONE_DOWNLINK_TAG
    },
    {
        repository: "tcd-thermostat-wot",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_THERMOSTAT_WOT_TAG
    },
    {
        repository: "tcd-waste-container-wot",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_WASTE_CONTAINER_WOT_TAG
    },
    {
        repository: "tcd-flood-monitoring-wot",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_FLOOD_MONITORING_WOT_TAG
    },
    {
        repository: "tcd-streetlight-wot",
        organization: process.env.GITHUB_ORGANIZATION,
        tag: process.env.TCD_STREETLIGHT_WOT_TAG
    }
];
