import store from "@/store";
import { postDataToNativeApp, isString } from "../utils/helper";

const routeNameWithoutAuth = ["terms", "signup"];
const storeSessionKeyAndUserID = (to, from, next) => {
  console.log(from, to);
  if (routeNameWithoutAuth.includes(to.name)) {
    next();
    return;
  }
  if (window.userInfoGPS || window.userInfo) {
    if (to.name === "ForeverLoading") {
      next({ name: "404" });
      return;
    }
    if (["home", "inquiries"].includes(to.name)) {
      if (
        store.state.userID &&
        store.state.sessionKey &&
        store.state.lat &&
        store.state.long
      ) {
        next();
        return;
      }
      const nativeData = window.userInfoGPS;
      let res = {};
      if (nativeData) {
        if (isString(nativeData)) {
          res = JSON.parse(nativeData);
        } else {
          res = nativeData;
        }
      } else {
        next({ name: "404" });
        return;
      }

      if (res.userID && res.sessionKey && res.lat && res.long) {
        store.commit("storeSessionKeyAndUserID", {
          userID: res.userID,
          sessionKey: res.sessionKey,
        });
        store.commit("storeLatAndLong", {
          lat: res.lat,
          long: res.long,
        });
        next();
        return;
      }
    } else {
      if (store.state.userID && store.state.sessionKey) {
        next();
        return;
      }
      const nativeData = window.userInfo || window.userInfoGPS;
      let res = {};
      if (isString(nativeData)) {
        res = JSON.parse(nativeData);
      } else {
        res = nativeData;
      }
      if (res.userID && res.sessionKey) {
        store.commit("storeSessionKeyAndUserID", {
          userID: res.userID,
          sessionKey: res.sessionKey,
        });
        next();
        return;
      }
    }
  } else {
    next({ name: "ForeverLoading" });
    return;
  }
};

const beforeSignUp = (to, from, next) => {
  console.log(from, to);
  if (from.name === null || from.name !== "terms") {
    next({ name: "terms" });
    return;
  }
  next();
  return;
};

export default [
  {
    path: "/",
    name: "ForeverLoading",
    component: () => import("@/pages/loading/ForeverLoading.vue"),
  },
  {
    path: "",
    name: "DefaultLayout",
    component: () => import("@/layouts/DefaultLayout.vue"),
    beforeEnter: storeSessionKeyAndUserID,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },
  {
    path: "",
    name: "EmptyLayout",
    component: () => import("@/layouts/EmptyLayout.vue"),
    children: [
      {
        path: "/signup",
        name: "signup",
        beforeEnter: beforeSignUp,
        component: () => import("@/pages/signup/index.vue"),
      },
      {
        path: "/admin/login",
        name: "admin.login",
        component: () => import("@/pages/admin/login/index.vue"),
      },
      {
        path: "/login",
        name: "user.login",
        component: () => import("@/pages/examinees/login/index.vue"),
      },
    ],
  },
  {
    path: "",
    name: "DetailLayout",
    component: () => import("@/layouts/DetailLayout.vue"),
    beforeEnter: storeSessionKeyAndUserID,
    children: [
      {
        path: "/notices",
        name: "notices.index",
        meta: { title: "お知らせ一覧" },
        component: () => import("@/pages/notices/index.vue"),
      },
      {
        path: "/unsubcribe",
        name: "unsubcribe",
        meta: { title: "アプリへの参加解除" },
        component: () => import("@/pages/unsubcribe/index.vue"),
      },
      {
        path: "/terms",
        name: "terms",
        meta: { title: "アプリへの参加許諾" },
        component: () => import("@/pages/terms/index.vue"),
      },
      {
        path: "/physical-program",
        name: "physical-program",
        meta: {
          title: "体力づくりプログラム",
        },
        component: () => import("@/pages/physical-program/index.vue"),
      },
      {
        path: "/knee-pains/edit",
        name: "knee-pains.edit",
        meta: {
          title: "膝の痛み",
        },
        component: () => import("@/pages/knee-pains/edit.vue"),
      },
      {
        path: "/knee-pains",
        name: "knee-pains.index",
        meta: {
          title: "膝の痛み",
          updateRouterName: "knee-pains.edit",
          back: "home",
        },
        component: () => import("@/pages/knee-pains/index.vue"),
      },
      {
        path: "/walks",
        name: "walks.index",
        meta: {
          title: "步行状態",
        },
        component: () => import("@/pages/walks/index.vue"),
      },
      {
        path: "/heartbeats",
        name: "heartbeats.index",
        meta: {
          title: "脈拍数",
        },
        component: () => import("@/pages/heartbeats/index.vue"),
      },
      {
        path: "/sleeps",
        name: "sleeps.index",
        meta: {
          title: "睡眠の状態",
        },
        component: () => import("@/pages/sleeps/index.vue"),
      },
      {
        path: "/moods",
        name: "moods.index",
        meta: {
          title: "気分",
          updateRouterName: "moods.edit",
          back: "home",
        },
        component: () => import("@/pages/moods/index.vue"),
      },
      {
        path: "/foods",
        name: "foods.index",
        meta: {
          title: "食事",
          callbackFunc: () => postDataToNativeApp("viewNutrition"),
          back: "home",
        },
        component: () => import("@/pages/foods/index.vue"),
      },
      {
        path: "/moods/edit",
        name: "moods.edit",
        meta: {
          title: "気分",
        },
        component: () => import("@/pages/moods/edit.vue"),
      },
      {
        path: "/mypage",
        name: "mypage",
        meta: { title: "ユーザ情報変更" },
        component: () => import("@/pages/mypage/index.vue"),
      },
      {
        path: "/inquiries",
        name: "inquiries",
        meta: { title: "お問い合わせ" },
        component: () => import("@/pages/inquiries/index.vue"),
      },
      {
        path: "/notices/:id",
        name: "notices.show",
        meta: { title: "お知らせ詳細" },
        component: () => import("@/pages/notices/show.vue"),
        props: true,
      },
      {
        path: "/devices/silmee",
        name: "devices.silmee.index",
        meta: { title: "Silmee登録" },
        component: () => import("@/pages/devices/silmee/index.vue"),
      },
      {
        path: "/devices/silmee/:id",
        name: "devices.silmee.show",
        meta: { title: "Silmee情報" },
        component: () => import("@/pages/devices/silmee/show.vue"),
        props: true,
      },
      {
        path: "/talks",
        name: "talks.index",
        meta: {
          title: "会話状態",
        },
        component: () => import("@/pages/talks/index.vue"),
      },
      {
        path: "/skin-temps",
        name: "skin-temps.index",
        meta: {
          title: "皮膚温度",
        },
        component: () => import("@/pages/skin-temps/index.vue"),
      },
    ],
  },
  {
    path: "",
    name: "AdminLayout",
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/admin/notices",
        name: "admin.notices",
        component: () => import("@/pages/admin/notices/index.vue"),
      },
      {
        path: "/admin/top",
        name: "admin.top",
        component: () => import("@/pages/admin/top/index.vue"),
      },
      {
        path: "/admin/password/edit",
        name: "admin.password.edit",
        component: () => import("@/pages/admin/password/edit.vue"),
      },
      {
        path: "/admin/examinees/new",
        name: "admin.examinees.new",
        component: () => import("@/pages/admin/examinees/new.vue"),
      },
      {
        path: "/admin/examinees/:id/edit",
        name: "admin.examinees.edit",
        component: () => import("@/pages/admin/examinees/edit.vue"),
        props: true,
      },
      {
        path: "/admin/examinees",
        name: "admin.examinees.index",
        component: () => import("@/pages/admin/examinees/index.vue"),
      },
      {
        path: "/admin/examinees/:id",
        name: "admin.examinees.show",
        component: () => import("@/pages/admin/examinees/show.vue"),
      },
      {
        path: "/admin/examinees/:id/steps",
        name: "admin.examinees.steps",
        component: () => import("@/pages/admin/examinees/steps/index.vue"),
        props: true,
      },
      {
        path: "/admin/examinees/:id/sleeps",
        name: "admin.examinees.sleeps",
        component: () => import("@/pages/admin/examinees/sleeps/index.vue"),
        props: true,
      },
      {
        path: "/admin/examinees/:id/hrs",
        name: "admin.examinees.hrs",
        component: () => import("@/pages/admin/examinees/hrs/index.vue"),
        props: true,
      },
      {
        path: "/admin/examinees/:id/skin-temps",
        name: "admin.examinees.skin-temps",
        component: () => import("@/pages/admin/examinees/skin-temps/index.vue"),
        props: true,
      },
      {
        path: "/admin/examinees/:id/talks",
        name: "admin.examinees.talks",
        component: () => import("@/pages/admin/examinees/talks/index.vue"),
        props: true,
      },
    ],
  },
  {
    path: "",
    name: "UserLayout",
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/examinees/:id",
        name: "user.home",
        component: () => import("@/pages/examinees/home/index.vue"),
      },
      {
        path: "/examinees/:id/steps",
        name: "user.examinees.steps",
        component: () => import("@/pages/examinees/steps/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/sleeps",
        name: "user.examinees.sleeps",
        component: () => import("@/pages/examinees/sleeps/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/hrs",
        name: "user.examinees.hrs",
        component: () => import("@/pages/examinees/hrs/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/skin-temps",
        name: "user.examinees.skin-temps",
        component: () => import("@/pages/examinees/skin-temps/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/talks",
        name: "user.examinees.talks",
        component: () => import("@/pages/examinees/talks/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/silmee",
        name: "user.examinees.silmee",
        component: () => import("@/pages/examinees/silmee/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/silmee/:silmee_id",
        name: "user.examinees.silmee.show",
        component: () => import("@/pages/examinees/silmee/show.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/walk",
        name: "user.examinees.walk",
        component: () => import("@/pages/examinees/walk/index.vue"),
        props: true,
      },
      {
        path: "/examinees/:id/walk/:walk_id",
        name: "user.examinees.walk.show",
        component: () => import("@/pages/examinees/walk/show.vue"),
        props: true,
      },
    ],
  },
  {
    // will match everything
    path: "*",
    name: "404",
    component: () => import("@/pages/error/404.vue"),
  },
];
