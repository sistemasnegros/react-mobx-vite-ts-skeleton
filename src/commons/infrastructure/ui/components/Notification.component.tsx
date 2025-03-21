import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";


type NotificationType = "success" | "info" | "warning" | "error";

interface Options {
  type: NotificationType;
  title: string;
  description: string;
  placement?: NotificationPlacement;

}

export const openNotificationWithIcon = ({
  type,
  title,
  description,
  placement = "bottomRight",
}: Options) => {
  notification[type]({
    message: title,
    description,
    placement,
  });
};
