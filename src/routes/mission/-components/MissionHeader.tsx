import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { isNil } from "es-toolkit/compat";
import { Select } from "radix-ui";
import { getAllGyms } from "@/generated/climbing-gym/climbing-gym";
import { setGym } from "@/generated/onboarding/onboarding";
import { getCurrentUserStatus } from "@/generated/user/user";
import { cn } from "@/utils/cn";
import { getHeaderToken } from "@/utils/cookie";
import CheckIcon from "../../../components/icons/CheckIcon";
import ChevronDownIcon from "../../../components/icons/ChevronDownIcon";

export default function MissionHeader() {
  const queryClient = useQueryClient();

  const { data: gyms } = useQuery({
    queryKey: ["gyms"],
    queryFn: () => getAllGyms(),
    select: (data) => data.data ?? [],
  });

  const { data: userStatus } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserStatus({ headers: getHeaderToken() }),
    select: (data) => data.data,
  });

  const selectedGymId = userStatus?.gym?.id?.toString() ?? "";

  const { mutateAsync: setGymMutation } = useMutation({
    mutationFn: (gymId: string) => {
      return setGym({ gymId: Number(gymId) }, { headers: getHeaderToken() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleGymChange = async (value: string) => {
    try {
      await setGymMutation(value);
    } catch (error) {
      console.error("암장 설정 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className="py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Select.Root value={selectedGymId} onValueChange={handleGymChange}>
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
                      {!isNil(gyms) &&
                        gyms.map((gym) => (
                          <Select.Item
                            key={gym.id}
                            value={gym.id?.toString() || ""}
                            className={cn(
                              "relative flex items-center gap-4 py-1.5 t-p-16-m cursor-pointer select-none outline-none transition-colors",
                              selectedGymId === gym.id?.toString()
                                ? "text-neutral-900"
                                : "text-neutral-600"
                            )}
                          >
                            <Select.ItemText>{gym.fullName}</Select.ItemText>
                            {selectedGymId === gym.id?.toString() && (
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
            to={`/users/${userStatus?.id ?? ""}`}
            className="w-11 h-11 rounded-full bg-neutral-900 hover:opacity-90 transition-opacity"
          ></Link>
        </div>
      </div>
    </div>
  );
}
