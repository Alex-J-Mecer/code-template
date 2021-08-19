export namespace globalConfig {
  interface windowConfig {
    navigationBarBackgroundColor?: string; // ! 导航栏背景颜色
    navigationBarTextStyle?: "black" | "white"; // ! 导航栏标题颜色
    navigationBarTitleText?: string; // ! 导航内容
    navigationStyle?: "default" | "custom"; // ! custom 为自定义导航
    backgroundTextStyle?: "dark" | "light"; // ! 下拉loading样式
    enablePullDownRefresh?: boolean; // ! 是否开启当前页面下拉
    onReachBottomDistance?: number; // ! 页面上拉触底事件触发时距页面底部距离
    pageOrientation?: "auto" | "portrait" | "landscape"; // ! 屏幕旋转设置
    backgroundColor?: string; // 窗口背景色
  }

  interface TabBarListItem {
    pagePath: string;
    text: string;
    iconPath?: string; // 未选中的图片路径
    selectedIconPath?: string; // 选中时的图片路径
  }

  interface ITabBar {
    color?: string;
    selectedColor?: string;
    backgroundColor?: string;
    borderStyle?: string; // 上边框的颜色
    position?: "bottom" | "top";
    custom: boolean; // 是否自定义tabbar
    list: TabBarListItem[];
  }

  interface AppConfig {
    pages?: string[];
    window?: windowConfig;
    tabBar?: ITabBar;
    subPackages?: {};
  }

  interface PageConfig extends windowConfig {
    disableSwipeBack?: boolean; // 禁止右滑手势返回
    disableScroll?: boolean; // 页面无法滚动
  }
}
