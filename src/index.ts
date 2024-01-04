

export class Color
{
  constructor(
    public r = 0, 
    public g = 0, 
    public b = 0, 
    public a = 1
  )
  {}

  decimal()
  {
    return [this.r/255, this.g/255, this.b/255, this.a/255];
  }

  static rgba(hex_str: string): Color
  {
    const hex = hex_str.slice(1);
    console.log(hex)

    if (hex.length == 8)
    {
      const [R, r] = hex.slice(0, 2);
      const [G, g] = hex.slice(2, 4);
      const [B, b] = hex.slice(4, 6);
      const [A, a] = hex.slice(6);

      return new Color(
        Hex(R!)*16 + Hex(r!), 
        Hex(G!)*16 + Hex(g!), 
        Hex(B!)*16 + Hex(b!),
        Hex(A!)*16 + Hex(a!),
      )
    }
    if (hex.length == 6)
    {
      const [R, r] = hex.slice(0, 2);
      const [G, g] = hex.slice(2, 4);
      const [B, b] = hex.slice(4);

      return new Color(
        Hex(R!)*16 + Hex(r!), 
        Hex(G!)*16 + Hex(g!), 
        Hex(B!)*16 + Hex(b!),
        255
      )
    }
    if (hex.length == 4)
    {
      const [R] = hex.slice(0, 1);
      const [G] = hex.slice(1, 2);
      const [B] = hex.slice(2, 3);
      const [A] = hex.slice(3);

      return new Color(
        Hex(R!)*16 + 16, 
        Hex(G!)*16 + 16, 
        Hex(B!)*16 + 16,
        Hex(A!)*16 + 16,
      )

    }
    if (hex.length == 3)
    {
      const [R] = hex.slice(0, 1);
      const [G] = hex.slice(1, 2);
      const [B] = hex.slice(2, 3);

      return new Color(
        Hex(R!)*16 + 16, 
        Hex(G!)*16 + 16, 
        Hex(B!)*16 + 16,
        255
      )
    }
    throw `${hex} is not valid hex`;
  }


}

function Hex(str: string) 
{
  return "0123456789ABCDEF".indexOf(str.toUpperCase());
}