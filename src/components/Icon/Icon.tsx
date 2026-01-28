import Image from "next/image";
import Home from "@/assets/icon/home.svg";
import Call from "@/assets/icon/call.svg";
import Camera from "@/assets/icon/camera.svg";

const icons = {
  home: Home,
  camera: Camera,
  call: Call,
};

interface StyledIconProps {
  name: string;
  iconColor?: string;
  size?: number;
  backgroundColor?: string;
}

export default function Icon({
  name,
  size = 28,
  iconColor,
}: StyledIconProps): React.ReactElement {
  const IconComponent = icons[name as keyof typeof icons];

  return (
    <div style={{ color: iconColor }}>
      {IconComponent ? (
        <Image src={IconComponent} alt={name} width={size} height={size} />
      ) : null}
    </div>
  );
}
