import { FC, useState } from "react";
import Connect from "./Connect";
import ConnectModal from "./ConnectModal";

type Props = {};

const Integrations: FC<Props> = () => {
  const [apiChannelModal, openAPIModal] = useState<boolean>(false);

  //Component ===============
  return (
    <div className="w-full h-[45rem] rounded bg-white dark:bg-slate-800 p-6 grid grid-cols-2 gap-4">
      {/**Connect Other Sources || Omni Channel Settings==================================== */}
      <Connect openAPIModal={openAPIModal} />
      <ConnectModal
        apiChannelModal={apiChannelModal}
        openAPIModal={openAPIModal}
      />
    </div>
  );
};

export default Integrations;
