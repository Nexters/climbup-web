import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import assetMyCharacter from "@/assets/images/ic_my_character.png";
import { getCurrentUserStatus } from "@/generated/user/user";
import { getHeaderToken } from "@/utils/cookie";
import { getLevelInfo } from "@/utils/level";

export default function MissionMyProfile() {
  const { data: userStatus } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUserStatus({ headers: getHeaderToken() }),
    select: (data) => data.data,
  });

  const levelInfo = getLevelInfo(userStatus?.sr ?? 0);

  return (
    <Link
      to="/my"
      className="flex items-center justify-between relative w-[55px] h-[46px] hover:opacity-90 transition-opacity"
    >
      <img
        src={userStatus?.imageUrl ?? assetMyCharacter}
        alt="user-profile"
        className="w-10 h-10 object-cover rounded-full"
      />
      <span className="absolute bottom-[2px] right-0 t-p-10-sb text-neutral-100 bg-neutral-500 border-2 border-neutral-100 rounded-full py-0.5 px-1">
        LV.{levelInfo.displayLevel}
      </span>
    </Link>
  );
}
