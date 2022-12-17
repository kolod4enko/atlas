export interface Transaction {
  hash: string;
  nonce: number;
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: number;
  input: string;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  timestamp: number;
  r: string;
  s: string;
  v: string;
}
