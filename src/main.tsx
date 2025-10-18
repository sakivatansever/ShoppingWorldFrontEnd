import { createRoot } from "react-dom/client";
import "./style/index.css";
import AppRouter from "./routes/AppRouter.tsx";
import { Provider } from "react-redux";
import "@progress/kendo-theme-material/dist/all.css";
// import "@progress/kendo-theme-default/dist/all.css";
import "@progress/kendo-theme-utils/dist/all.css";
import { store, persistor } from "./store/index.ts";
import { PersistGate } from "redux-persist/integration/react";
import "./services/axiosConfig.js";
import { IntlProvider, LocalizationProvider, loadMessages, load } from "@progress/kendo-react-intl";
import trMessages from "./messages/tr-TR.json";

// CLDR Türkçe locale verilerini yükle
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/tr/numbers.json';
import currencies from 'cldr-numbers-full/main/tr/currencies.json';
import caGregorian from 'cldr-dates-full/main/tr/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/tr/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/tr/timeZoneNames.json';


load(
  likelySubtags,
  currencyData,
  weekData,
  numbers,
  currencies,
  caGregorian,
  dateFields,
  timeZoneNames
);

loadMessages(trMessages, 'tr-TR');

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider language="tr-TR">
        <IntlProvider locale="tr">
          <AppRouter />
        </IntlProvider>
      </LocalizationProvider>
    </PersistGate>
  </Provider>
);
