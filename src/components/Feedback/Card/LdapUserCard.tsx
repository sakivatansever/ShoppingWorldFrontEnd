import React from "react";
import { Card, CardHeader, CardBody } from "@progress/kendo-react-layout";
import {
  envelopeIcon,
  mapMarkerIcon,
  outlineOffsetIcon,
} from "@progress/kendo-svg-icons";
import { SvgIcon } from "@progress/kendo-react-common";

type LdapUserCardProps = {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  office: string;
  department: string;
  avatarUrl?: string;
  width?: string;
};

const LdapUserCard: React.FC<LdapUserCardProps> = ({
  firstName,
  lastName,
  title,
  email,
  office,
  department,
  avatarUrl,
  width = "320",
}) => {
  return (
    <Card style={{ width: width, padding: 16, borderRadius: 12 }}>
      <CardHeader>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
            alt="avatar"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "#f0f0f0",
            }}
          />
          <div>
            <div style={{ fontWeight: "bold", fontSize: 18 }}>
              {firstName} {lastName}
            </div>
            <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <SvgIcon icon={envelopeIcon} size="medium" />
          <span style={{ marginLeft: 8 }}>{email}</span>
        </div>

        {/* <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <SvgIcon icon={commentIcon} size="medium" />
          <span style={{ marginLeft: 8 }}>{phoneNumber}</span>
        </div> */}

        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <SvgIcon icon={mapMarkerIcon} size="medium" />
          <span style={{ marginLeft: 8 }}>{office}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <SvgIcon icon={outlineOffsetIcon} size="medium" />
          <span style={{ marginLeft: 8 }}>{department}</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default LdapUserCard;
