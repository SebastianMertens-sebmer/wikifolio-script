import Airtable from "airtable";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_APP_ID || ""
);

export async function getRecordList(tableName: string) {
  const records = await base(tableName).select({}).all();
  return records.map((record) => {
    return record._rawJson;
  });
}

export async function createRecords(
  tableName: string,
  records: { fields: any }[]
) {
  return await base(tableName).create(records);
}

export default base;
