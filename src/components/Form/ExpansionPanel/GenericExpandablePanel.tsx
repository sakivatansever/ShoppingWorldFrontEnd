import React, { useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelContent,
} from "@progress/kendo-react-layout";
import { Reveal } from "@progress/kendo-react-animation";

interface GenericExpandablePanelProps {
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  subtitle?: string;
  defaultExpanded?: boolean;
}

const GenericExpandablePanel: React.FC<GenericExpandablePanelProps> = ({
  title,
  children,
  disabled = false,
  subtitle,
  defaultExpanded,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = (event: any) => {
    if (event.syntheticEvent.key == undefined) {
      setExpanded(!event.expanded);
    }
  };
  return (
    <ExpansionPanel
      expanded={expanded}
      style={{ cursor: "pointer", userSelect: "none" }}
      onAction={toggleExpanded}
      title={title}
      subtitle={subtitle}
      disabled={disabled}
    >
      <Reveal>
        <ExpansionPanelContent>
          <div style={{ display: expanded ? "block" : "none" }}>
            {children}
          </div>
        </ExpansionPanelContent>
      </Reveal>

    </ExpansionPanel>
  );
};

export default GenericExpandablePanel;
