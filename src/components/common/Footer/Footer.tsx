import { DrawerContent } from "@progress/kendo-react-layout";

function Footer() {
  return (
    <>
      <DrawerContent style={{height: "calc(9vh)"}}>
        <div className="!k-bg-surface !k-color-subtle k-bg-light k-py-6 k-px-10">
          <p className="!k-mb-0">
            Copyright © 2024 Progress Software. All rights reserved.
          </p>
        </div>
      </DrawerContent>
    </>
  );
}

export default Footer;
