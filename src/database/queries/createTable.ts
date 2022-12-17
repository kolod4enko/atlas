import { TABLE_NAME } from '../constants';

export const createTable = `
  CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
  (
      hash String,
      nonce UInt16,
      from String,
      to String,
      value UInt16,
      gas UInt32,
      gasPrice UInt16,
      input String,
      blockHash String,
      blockNumber UInt32,
      transactionIndex UInt16,
      timestamp UInt64,
      r String,
      s String,
      v String
  )
  ENGINE MergeTree()
  PRIMARY KEY (hash)
  ORDER BY (blockNumber, hash, timestamp, from, to)
`;
