import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function DemoNotice() {
  return (
    <div className="demo-notice">
      <Icon name="idea" size={17} />
      <span>
        Estás explorando una demo. Los datos son de ejemplo y tus cambios se
        guardan solo en este navegador.
      </span>
    </div>
  );
}
export function IconTile({
  name,
  color = "mint",
}: {
  name: IconName;
  color?: string;
}) {
  return (
    <span className={`icon-tile ${color}`}>
      <Icon name={name} size={25} />
    </span>
  );
}
