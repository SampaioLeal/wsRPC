import { RPCReply } from "../../mod.ts";

type ServiceContracts = {
  hello: (clientName: string) => Promise<RPCReply<void>>;
};

export default ServiceContracts;
