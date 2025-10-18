import { Button, ButtonHandle } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";
import { useState, useRef, useEffect } from "react";

interface EntityActionsProps {
    onAdd?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    selectionCount?: number;
}

const EntityActions = ({ onAdd, onEdit, onDelete, selectionCount }: EntityActionsProps) => {
    const [show, setShow] = useState(false);
    const anchor = useRef<ButtonHandle | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                show &&
                !anchor.current?.element?.contains(target) &&
                !popupRef.current?.contains(target)
            ) {
                setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [show]);

    const isSingleSelection = selectionCount === 1;

    return (
        <div>
            <Button
                icon="chevron-up"
                ref={anchor}
                onClick={(e) => {
                    setShow((prev) => !prev);
                    (e.currentTarget as HTMLButtonElement).blur();
                }}
                onMouseLeave={(e) => e.currentTarget.blur()}
                type="button"
                style={{
                    backgroundColor: "#665191",
                    color: "white",
                    width: "40px",
                    height: "40px",
                    borderRadius: "6px"
                }}
            />

            <Popup
                show={show}
                anchor={anchor.current?.element as HTMLElement}
                anchorAlign={{ horizontal: "center", vertical: "top" }}
                popupAlign={{ horizontal: "center", vertical: "bottom" }}
            >
                <div
                    ref={popupRef}
                    style={{
                        display: "flex",
                        gap: "8px",
                        background: "white",
                        padding: "6px",
                        borderRadius: "6px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        backgroundColor: "#665191",
                    }}
                >
                    <Button
                        icon="plus"
                        type="button"
                        onClick={(e) => {
                            onAdd?.();
                            (e.currentTarget as HTMLButtonElement).blur();
                        }}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        style={btnStyle}
                    />

                    <Button
                        icon="edit"
                        type="button"
                        onClick={(e) => {
                            onEdit?.();
                            (e.currentTarget as HTMLButtonElement).blur();
                        }}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        style={btnStyle}
                    />

                    <Button
                        icon="minus"
                        type="button"
                        onClick={(e) => {
                            onDelete?.();
                            (e.currentTarget as HTMLButtonElement).blur();
                        }}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        style={btnStyle}
                    />
                </div>
            </Popup>
        </div>
    );
};


const btnStyle = {
    backgroundColor: "#665191",
    color: "white",
    width: "40px",
    height: "40px",
    borderRadius: "6px",
};

export default EntityActions;
