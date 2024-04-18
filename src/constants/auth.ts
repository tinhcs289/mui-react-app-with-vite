import * as yup from "yup";

export const shapeOfAuthenticateJWT = yup.object().shape({
  accessToken: yup.string().required(),
  refreshToken: yup.string().required(),
  expires: yup.number().required(),
});

export const shapeOfUserProfile = yup.object().shape({
  id: yup.lazy((value) => {
    if (typeof value === "string") return yup.string().required();
    if (typeof value === "number") return yup.number().required();
    return yup.string().required();
  }),
  username: yup.string().required(),
  displayname: yup.string().notRequired(),
  firstName: yup.string().notRequired(),
  middleName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  avatar: yup.string().notRequired(),
  email: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  orginalData: yup.object().shape({}).notRequired(),
});

export const shapeOfUserPermissions = yup.array().of(
  yup
    .object()
    .shape({
      id: yup.lazy((value) => {
        if (typeof value === "string") return yup.string().nullable();
        if (typeof value === "number") return yup.number().nullable();
        return yup.string().nullable();
      }),
      key: yup.string().required(),
      name: yup.string().required(),
    })
    .required()
);

export const shapeOfUserRoles = yup.array().of(
  yup
    .object()
    .shape({
      id: yup.lazy((value) => {
        if (typeof value === "string") return yup.string().nullable();
        if (typeof value === "number") return yup.number().nullable();
        return yup.string().nullable();
      }),
      key: yup.string().nullable(),
      name: yup.string().required(),
      permissions: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              id: yup.lazy((value) => {
                if (typeof value === "string") return yup.string().nullable();
                if (typeof value === "number") return yup.number().nullable();
                return yup.string().nullable();
              }),
              key: yup.string().required(),
              name: yup.string().required(),
            })
            .required()
        )
        .nullable(),
    })
    .required()
);
