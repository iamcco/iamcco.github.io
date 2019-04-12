# svg

## `<path>` 标签用来定义路径。

下面的命令可用于路径数据：

- M = moveto(M X,Y) ：将画笔移动到指定的坐标位置
- L = lineto(L X,Y) ：画直线到指定的坐标位置
- H = horizontal lineto(H X)：画水平线到指定的X坐标位置
- V = vertical lineto(V Y)：画垂直线到指定的Y坐标位置
- C = curveto(C X1,Y1,X2,Y2,ENDX,ENDY)：三次贝赛曲线
- S = smooth curveto(S X2,Y2,ENDX,ENDY)：平滑曲率
- Q = quadratic Belzier curve(Q X,Y,ENDX,ENDY)：二次贝赛曲线
- T = smooth quadratic Belzier curveto(T ENDX,ENDY)：映射
- A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
- Z = closepath()：关闭路径

> 注释：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="200"
  height="200"
>
  <path
    d="M100,0 A90,90 0 1 1, 100,190 M100,0 A90,90 0 1 0, 100,190"
    fill="transparent"
    stroke="#000"
    stroke-width="20"
  >
  </path>
</svg>
```

### A 指令

they are going

SVG 路径中的A指令有7个参数，分别控制曲线的的各个属性。下面解释一下参数的含义：

- rx 弧的半长轴长度
- ry 弧的半短轴长度
- x-axis-rotation 是此段弧所在的x轴与水平方向的夹角，即x轴的逆时针旋转角度，负数代表顺时针转动的角度。
- large-arc-flag 为1 表示大角度弧线，0 代表小角度弧线。
- sweep-flag 为1代表从起点到终点弧线绕中心顺时针方向，0 代表逆时针方向。
- x,y 是弧终端坐标。

## Section One


