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
  iconColor = "white",
}: StyledIconProps): React.ReactElement {
  const IconComponent = icons[name as keyof typeof icons];

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: iconColor,
        mask: `url(${IconComponent.src}) no-repeat center / contain`,
        WebkitMask: `url(${IconComponent.src}) no-repeat center / contain`,
      }}
    />
  );
}
