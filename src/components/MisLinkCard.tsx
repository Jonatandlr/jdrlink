import React from "react";
import ButtonCopy from "./ButtonCopy";

interface MisLinkCardProps {
  title: string;
  link: string;
  id: string;
}

export default function MisLinkCard({ title, link,id }: MisLinkCardProps) {
  return (
    <div
    key={id}
    
    className="bg-white rounded-xl p-4  flex border border-black shadow-[5px_8px_5px_-2px] shadow-black/50 relative">
      <div>{linkIcon()}</div>
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <a
          className="text-gray-500 transition duration-300 hover:underline hover:text-rose-600 pt-5 break-all  block"
          href={link}
        >
          {link}
        </a>
      </div>
      <ButtonCopy link={link} className="absolute top-2 right-2" />
    </div>
  );
}

function linkIcon() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 127 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M66.5748 56.8186L63.5953 59.9551C63.4661 60.0917 63.3475 60.2369 63.2351 60.3872C63.2011 60.4314 63.1704 60.479 63.1379 60.5251C63.0603 60.6358 62.9876 60.7496 62.9194 60.8669C62.8903 60.9171 62.8601 60.9674 62.833 61.0189C62.7574 61.159 62.6892 61.3029 62.6279 61.4505C62.617 61.4764 62.6041 61.5 62.5942 61.5254C62.5245 61.7002 62.4652 61.8797 62.4156 62.0627C62.4121 62.0755 62.4091 62.0896 62.4064 62.103C63.7622 62.5089 65.0049 63.2763 66.0185 64.3501C67.4936 65.9065 68.3528 67.9767 68.4379 70.1804C68.4379 70.1867 68.4396 70.1919 68.4396 70.1979C68.4396 70.2016 68.4396 70.2045 68.4396 70.2076C68.4396 70.2087 68.4396 70.2092 68.4396 70.2092C68.5406 72.6552 67.6536 75.0594 66.0051 76.7925L62.1328 80.8737C62.1264 80.8805 62.1177 80.885 62.1112 80.8926L51.0766 92.5105C49.5052 94.1685 47.4137 95.0824 45.1877 95.0824C42.9588 95.0824 40.8623 94.1654 39.2845 92.4998C37.7116 90.8373 36.8469 88.6258 36.8496 86.2724C36.8519 83.9191 37.7203 81.7096 39.2944 80.0506L49.5253 69.2777C49.4973 69.1843 49.478 69.0888 49.4512 68.9946C49.3981 68.8072 49.3512 68.6174 49.3033 68.4274C49.2138 68.0762 49.1334 67.7216 49.0627 67.3641C49.0233 67.1636 48.9851 66.9631 48.9518 66.7616C48.8901 66.3871 48.8427 66.0097 48.8015 65.6299C48.7822 65.4522 48.7576 65.2755 48.7432 65.0965C48.6981 64.5398 48.6701 63.9798 48.6701 63.4147C48.6706 62.9947 48.6864 62.5746 48.7132 62.1558C48.7217 62.0153 48.7383 61.8753 48.7497 61.7353C48.7735 61.4565 48.7981 61.1778 48.8328 60.9017C48.8382 60.8567 48.8405 60.8111 48.8462 60.7664L34.9216 75.4276C29.2505 81.3998 29.2413 91.1273 34.902 97.1131C37.6454 100.016 41.2981 101.615 45.1877 101.615C49.0627 101.615 52.7068 100.024 55.4497 97.1343L70.3796 81.4194C71.4013 80.3458 72.2611 79.1246 72.9367 77.7886C74.5669 74.5569 75.0392 70.8559 74.3191 67.3313C74.1529 66.5182 73.923 65.7137 73.6295 64.9269C72.9013 62.9761 71.8161 61.2286 70.4024 59.7339C69.2716 58.5365 67.9882 57.5598 66.5748 56.8186Z"
        fill="#E11D48"
      />
      <path
        d="M52.3912 62.3783C52.3681 62.724 52.3543 63.0706 52.3538 63.4181C52.3538 65.3779 52.6938 67.2806 53.3646 69.0707C54.0903 71.0148 55.1783 72.7623 56.6008 74.2661C57.7282 75.4624 59.0103 76.4394 60.4235 77.1798L63.4033 74.0415C63.5342 73.9039 63.6538 73.7568 63.7666 73.6055C63.8024 73.5587 63.8341 73.5092 63.8671 73.4613C63.9413 73.3527 64.0137 73.2412 64.0797 73.1274C64.1127 73.069 64.1452 73.0104 64.1762 72.9512C64.2359 72.8374 64.2905 72.7212 64.3414 72.6026C64.3667 72.5443 64.3935 72.4867 64.4158 72.4275C64.4748 72.2765 64.5249 72.1224 64.5693 71.9659C64.5758 71.9423 64.5852 71.9195 64.5909 71.896C63.2403 71.49 61.9991 70.7248 60.9831 69.6528C59.5268 68.1162 58.6723 66.0848 58.5644 63.9193V63.918C58.5629 63.8931 58.5584 63.8685 58.5579 63.8429C58.547 63.7055 58.5448 63.5642 58.5448 63.4283C58.5505 61.0726 59.4196 58.8634 60.9925 57.2047L75.9232 41.489C77.501 39.8307 79.5935 38.9184 81.816 38.9184C84.0447 38.9184 86.141 39.8354 87.7188 41.5005C90.965 44.9376 90.9573 50.5188 87.7044 53.9449L77.4688 64.7228C77.5062 64.8466 77.5355 64.9712 77.5702 65.0957C77.6211 65.2755 77.6726 65.4556 77.7175 65.638C77.7577 65.7966 77.7925 65.9568 77.8282 66.1162C77.8706 66.3025 77.9125 66.4889 77.9495 66.6765C77.98 66.8338 78.0065 66.994 78.0338 67.1523C78.0663 67.3421 78.098 67.531 78.1253 67.7208C78.1477 67.8804 78.1665 68.0406 78.1851 68.2005C78.2072 68.3905 78.2288 68.5792 78.2466 68.7692C78.2605 68.931 78.2714 69.0924 78.2816 69.2542C78.2935 69.4426 78.3049 69.6308 78.3121 69.819C78.3183 69.9839 78.3208 70.1477 78.3235 70.3126C78.3253 70.4976 78.326 70.6837 78.3235 70.869C78.3208 71.036 78.3163 71.2022 78.3094 71.3686C78.3024 71.5516 78.293 71.7353 78.2809 71.918C78.2694 72.0857 78.2556 72.2527 78.2402 72.4207C78.2238 72.6021 78.2047 72.7827 78.1836 72.9625C78.173 73.0507 78.1673 73.1389 78.1558 73.226L92.0775 58.5679C94.8214 55.6817 96.3332 51.8339 96.3377 47.7323C96.3421 43.6311 94.838 39.7799 92.1023 36.8869C89.3579 33.9837 85.7054 32.3851 81.816 32.3851C77.9393 32.3851 74.293 33.9763 71.5506 36.8668L56.6202 52.5803C55.5965 53.6618 54.7323 54.8829 54.0546 56.2104C54.0546 56.2109 54.0539 56.2109 54.0539 56.2117C53.0977 58.1018 52.5314 60.2155 52.3912 62.3783Z"
        fill="#E11D48"
      />
    </svg>
  );
}
