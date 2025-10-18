import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectHasPermission } from "../../utils";
import { JSX } from "react";
import ForbiddenInline from "./ForbiddenInline";

type Props = { controller: string; operation?: string; children: JSX.Element };

export default function RequirePermission({ controller, operation, children }: Props) {
  const allowed = useSelector(selectHasPermission(controller, operation));
  if (!allowed) return <ForbiddenInline />; 
  return children;
}
