import { FC } from "react";
import { RingProgress, Text } from "@mantine/core";

type Props = { data: any };

const Sentiment: FC<Props> = ({ data }) => {
  const sentimentArray = [
    {
      value: Number(
        (
          (data?.filter((data: any) => data?.feedback === "like")?.length /
            data?.length) *
          100
        )?.toFixed(0)
      ),
      count: data?.filter((data: any) => data?.feedback === "like")?.length,
      color: "#059669",
    },
    {
      value: Number(
        (
          (data?.filter(
            (data: any) =>
              data?.feedback !== "like" && data?.feedback !== "dislike"
          )?.length /
            data?.length) *
          100
        )?.toFixed(0)
      ),
      count: data?.filter(
        (data: any) => data?.feedback !== "like" && data?.feedback !== "dislike"
      )?.length,
      color: "#facc15",
    },
    {
      value: Number(
        (
          (data?.filter((data: any) => data?.feedback === "dislike")?.length /
            data?.length) *
          100
        )?.toFixed(0)
      ),
      count: Number(
        data?.filter((data: any) => data?.feedback === "dislike")?.length
      ),
      color: "#dc2626",
    },
  ];

  //Component ======================
  return (
    <div className="h-fit w-full overflow-hidden md:px-6">
      <div className="flex justify-between w-full relative overflow-hidden">
        {[0, 1, 2].map((dataIndex) => {
          return (
            <div key={dataIndex} className="flex items-center">
              <RingProgress
                size={120}
                thickness={10}
                roundCaps
                sections={[sentimentArray[dataIndex]]}
                label={
                  <Text
                    color="blue"
                    weight={700}
                    align="center"
                    size="lg"
                    classNames={{ root: "dark:text-slate-300 text-slate-800" }}
                  >
                    {sentimentArray[dataIndex]?.value
                      ? sentimentArray[dataIndex]?.value
                      : 0}
                    %
                  </Text>
                }
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-3 p-4">
        {sentimentArray?.map((data) => {
          return (
            <div
              key={data?.color}
              className="flex flex-col justify-center items-center"
            >
              <div className="flex items-center space-x-1">
                <div
                  style={{ background: data?.color }}
                  className="h-3 w-3 rounded-full"
                ></div>
                <span className="text-xs font-sans dark:text-slate-300 text-slate-800">
                  {data?.color === "#dc2626"
                    ? "Positive"
                    : data?.color === "#059669"
                    ? "Negative"
                    : "Neutral"}
                </span>
              </div>
              <div className="text-xs dark:text-slate-300 text-slate-800 font-sans font-semibold tracking-wider">
                {data?.count ? data?.count : 0}
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-center text-xs font-medium tracking-normal text-slate-600 dark:text-slate-400 overflow-hidden text-ellipsis">
        Sentiment data is collection on each ticket resolution. If the
        customer/client does not respond, the feedback is marked as neutral.
      </p>
    </div>
  );
};

export default Sentiment;
