import CoinCard from "@/components/CoinCard";
import { getUserDetails } from "@/utils/getUserDetails";
import { NextRequest } from "next/server";

const Dashboard = async (request: NextRequest) => {
  const currentUser = await getUserDetails(request);

  return (
    <div className="flex flex-col gap-4 bg-gray-900 min-h-screen">
      {currentUser?.selectedCoins?.length > 0 ? (
        currentUser?.selectedCoins?.map((coin) => (
          <CoinCard key={coin?.id} coin={coin} />
        ))
      ) : (
        <div>
          <p className="text-white text-2xl py-2 px-2">Welcome Back,</p>
          <p className="text-white text-xl px-2">{`${currentUser?.username}`}</p>
          <p className="text-white text-xl px-2">{`${currentUser?.email}`}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
