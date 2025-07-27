import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import CheckIcon from "../../../components/icons/CheckIcon";
import ChevronDownIcon from "../../../components/icons/ChevronDownIcon";

const gyms = [
  { id: "gangnam", name: "더클라임 강남" },
  { id: "yangjae", name: "더클라임 양재" },
] as const;

export default function MissionHeader() {
  const [selectedGym, setSelectedGym] = useState("gangnam");

  const handleMyPageClick = () => {
    console.log("마이페이지로 이동");
  };

  return (
    <div className="py-4 px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Select.Root value={selectedGym} onValueChange={setSelectedGym}>
              <Select.Trigger className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Select.Value placeholder="암장 선택" />
                <Select.Icon className="ml-2">
                  <ChevronDownIcon variant="dark" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200">
                  <Select.Viewport className="p-1">
                    <Select.Group>
                      {gyms.map((gym) => (
                        <Select.Item
                          key={gym.id}
                          value={gym.id}
                          className="relative flex items-center px-8 py-2 text-sm text-gray-900 cursor-pointer select-none hover:bg-gray-100 focus:bg-gray-100 outline-none"
                        >
                          <Select.ItemText>{gym.name}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-2 w-4 h-4">
                            <CheckIcon variant="dark" width={15} height={15} />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <button
            type="button"
            onClick={handleMyPageClick}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            마이페이지
          </button>
        </div>
      </div>
    </div>
  );
}
