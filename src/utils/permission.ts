// utils/permissions.ts
import { RootState } from "../store";
import { IPermission } from "../services/auth/authLogin";

/**
 * Kullanıcıda belirli controller/operation izni var mı?
 * @param permissions Kullanıcının tüm izinleri
 * @param controller İlgili controller adı (örn: "Event")
 * @param operation İlgili operation adı (örn: "Create"), opsiyonel
 */
export const hasPermission = (
  permissions: IPermission[] | undefined,
  controller: string,
  operation?: string
): boolean => {
  if (!permissions || permissions.length === 0) return false;

  const c = controller.toLowerCase();
  const o = operation?.toLowerCase();

  return permissions.some(
    (p) =>
      p.controller?.toLowerCase() === c &&
      (o ? p.operation?.toLowerCase() === o : true)
  );
};

/**
 * Redux selector üzerinden kullanılacak versiyon
 * Örn: useSelector(selectHasPermission("Event", "Create"))
 */
export const selectHasPermission =
  (controller: string, operation?: string) =>
  (state: RootState) =>
    hasPermission(state.auth.permissions, controller, operation);
