import api from "./api";

async function getModelInfo() {
  const { data } = await api.get("/model/info");
  return data.data;
}

export default { getModelInfo };
