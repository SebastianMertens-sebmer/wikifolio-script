import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyJG2PhR478uRcXz" }).base(
  "appo3dMBuyzzBx9je"
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
