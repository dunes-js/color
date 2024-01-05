type ColorVec3 = [number, number, number];
type ColorVec4 = [number, number, number, number];

export class Color
{
  constructor(
    public r = 0, 
    public g = 0, 
    public b = 0, 
    public a = 1
  )
  {}

  rgba(): ColorVec4 
  {
    return [this.r*255, this.g*255, this.b*255, this.a*255];
  }

  decimal(): ColorVec4
  {
    return [this.r, this.g, this.b, this.a];
  }

  static fromRGB([r,g,b,a = 255]: [number, number, number, number?]): Color
  {
    return new Color(r/255, g/255, b/255, a/255);
  }

  static fromHex(hex_str: string): Color
  {
    const hex = hex_str.slice(1);

    if (hex.length == 8)
    {
      const [R, r] = hex.slice(0, 2);
      const [G, g] = hex.slice(2, 4);
      const [B, b] = hex.slice(4, 6);
      const [A, a] = hex.slice(6);

      return Color.fromRGB([
        HEX.value(R!, 16) + HEX.value(r!), 
        HEX.value(G!, 16) + HEX.value(g!), 
        HEX.value(B!, 16) + HEX.value(b!),
        HEX.value(A!, 16) + HEX.value(a!),
      ])
    }
    if (hex.length == 6)
    {
      const [R, r] = hex.slice(0, 2);
      const [G, g] = hex.slice(2, 4);
      const [B, b] = hex.slice(4);

      return Color.fromRGB([
        HEX.value(R!, 16) + HEX.value(r!), 
        HEX.value(G!, 16) + HEX.value(g!), 
        HEX.value(B!, 16) + HEX.value(b!),
      ])
    }
    if (hex.length == 4)
    {
      const [R] = hex.slice(0, 1);
      const [G] = hex.slice(1, 2);
      const [B] = hex.slice(2, 3);
      const [A] = hex.slice(3);

      return Color.fromRGB([
        HEX.value(R!, 16) + 16, 
        HEX.value(G!, 16) + 16, 
        HEX.value(B!, 16) + 16,
        HEX.value(A!, 16) + 16,
      ])

    }
    if (hex.length == 3)
    {
      const [R] = hex.slice(0, 1);
      const [G] = hex.slice(1, 2);
      const [B] = hex.slice(2, 3);

      return Color.fromRGB([
        HEX.value(R!, 16) + 16, 
        HEX.value(G!, 16) + 16, 
        HEX.value(B!, 16) + 16,
      ])
    }

    throw `${hex} is not valid hex`;
  }

  static fromHSL([h,s,l,a = 255]: [number, number, number, number?]): Color
  {
    s /= 100;
    l /= 100;
    a /= 100;

    const {chroma, light, x} = HSL.getLightFromHsl([h,s,l,a])
    const [r,g,b] = HSL.rgbFromHue(chroma, h, x)

    return new Color(r + light, g + light, b + light, a);
  }
}

class HEX
{
  static value(str: string, m = 1) 
  {
    return "0123456789ABCDEF".indexOf(str.toUpperCase()) * m;
  }
}

class HSL
{

  static getLightFromHsl([h,s,l]: ColorVec4) {

    let chroma = this.#getChroma(l, s)
    let x = this.#getSecondLargest(chroma, h)
    const light = this.#getLight(chroma, l)

    return {chroma, x, light}
  }

  static rgbFromHue(chroma: number, h: number, x: number): ColorVec3 
  {
    let [r,g,b]: ColorVec3 = [0, 0, 0];

    if (0 <= h && h < 60) 
    {
      r = chroma
      b = x
      g = 0
    }
    else if ( 60 <= h && h < 120) 
    {
      r = x
      b = chroma
      g = 0
    }
    else if (120 <= h && h < 180) 
    {
      r = 0
      b = chroma
      g = x
    }
    else if (180 <= h && h < 240) 
    {
      r = 0
      b = x
      g = chroma
    }
    else if (240 <= h && h < 300) 
    {
      r = x
      b = 0
      g = chroma
    }
    else if (300 <= h && h < 360) 
    {
      r = chroma
      b = 0
      g = x
    }

    return [r, g, b]
  }

  static #getChroma(li: number, sa: number) {
    return (
      (1 - Math.abs(2 * li - 1)) * sa
    )
  }

  static #getSecondLargest(ch: number, hu: number) {
    return (
      ch * (1 - Math.abs((hu / 60) % 2 - 1))
    )
  }

  static #getLight(ch: number, li: number) {
    return (
      li - ch / 2
    )
  }

}
