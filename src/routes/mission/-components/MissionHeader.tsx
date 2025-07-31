import { Link } from "@tanstack/react-router";
import { clsx } from "clsx";
import { Select } from "radix-ui";
import { useState } from "react";
import CheckIcon from "../../../components/icons/CheckIcon";
import ChevronDownIcon from "../../../components/icons/ChevronDownIcon";

const gyms = [
  { id: "gangnam", name: "더 클라임 강남" },
  { id: "nonhyeon", name: "더 클라임 논현" },
] as const;

export default function MissionHeader() {
  const [selectedGym, setSelectedGym] = useState("gangnam");

  return (
    <div className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Select.Root value={selectedGym} onValueChange={setSelectedGym}>
              <Select.Trigger className="inline-flex items-center justify-center gap-2 py-2 t-p-22-sb text-neutral-100 hover:opacity-90 focus:outline-none">
                <Select.Value placeholder="암장 선택" />
                <Select.Icon>
                  <ChevronDownIcon variant="white" />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  position="popper"
                  sideOffset={8}
                  className="overflow-hidden bg-neutral-100 rounded-3xl shadow-lg z-50 min-w-[177px]"
                >
                  <Select.Viewport className="p-6">
                    <Select.Group className="space-y-2">
                      {gyms.map((gym) => (
                        <Select.Item
                          key={gym.id}
                          value={gym.id}
                          className={clsx(
                            "relative flex items-center gap-4 py-1.5 t-p-16-m cursor-pointer select-none outline-none transition-colors",
                            selectedGym === gym.id
                              ? "text-neutral-900"
                              : "text-neutral-600"
                          )}
                        >
                          <Select.ItemText>{gym.name}</Select.ItemText>
                          {selectedGym === gym.id && (
                            <Select.ItemIndicator>
                              <CheckIcon
                                variant="dark"
                                width={24}
                                height={24}
                              />
                            </Select.ItemIndicator>
                          )}
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <Link
            to="/users/1"
            className="w-11 h-11 rounded-full bg-neutral-900 hover:opacity-90 transition-opacity"
          ></Link>
        </div>
      </div>
    </div>
  );
}
