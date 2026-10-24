// Public deterministic teaching identities only. These keys never hold live funds.
export function createScenarios(sdk){
 const a=sdk.Keypair.fromRawEd25519Seed(Buffer.alloc(32,11)).publicKey(),b=sdk.Keypair.fromRawEd25519Seed(Buffer.alloc(32,22)).publicKey(),sponsor=sdk.Keypair.fromRawEd25519Seed(Buffer.alloc(32,33)).publicKey();
 const key=id=>sdk.xdr.LedgerKey.account(new sdk.xdr.LedgerKeyAccount({accountId:sdk.Keypair.fromPublicKey(id).xdrAccountId()})).toXDR('base64');
 function tx(op,source=a){return new sdk.TransactionBuilder(new sdk.Account(source,'100'),{fee:'10000',networkPassphrase:sdk.Networks.TESTNET}).addOperation(op).setTimebounds(0,0).build()}
 const payment=tx(sdk.Operation.payment({destination:b,asset:sdk.Asset.native(),amount:'1'}));
 const opaque=tx(sdk.Operation.claimClaimableBalance({balanceId:'00000000'+'ab'.repeat(32)}));
 const feeBump=sdk.TransactionBuilder.buildFeeBumpTransaction(sponsor,'10000',payment,sdk.Networks.TESTNET);
 const unknown=tx(sdk.Operation.manageData({name:'example',value:'public'}));
 return {schemaVersion:1,title:'Quarantine review desk',snapshot:{schemaVersion:1,network:'testnet',ledger:100,protocolVersion:26,frozenKeys:[],bypassHashes:[],provenance:'Synthetic teaching snapshot; not network state'},proposal:{freeze:[key(b)],unfreeze:[],addBypass:[],removeBypass:[]},envelopes:[{id:'native-payment',xdr:payment.toXDR()},{id:'fee-bump-payment',xdr:feeBump.toXDR()},{id:'opaque-claim',xdr:opaque.toXDR()},{id:'unsupported-manage-data',xdr:unknown.toXDR()}],labels:{[key(a)]:'Sender',[key(b)]:'Recipient',[key(sponsor)]:'Fee sponsor'}};
}
