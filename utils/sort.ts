function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => acc * 256 + Number(octet), 0);
}

export function sortByIp(a: string, b: string, asc = true): number {
  const aNum = ipToNumber(a);
  const bNum = ipToNumber(b);
  return asc ? aNum - bNum : bNum - aNum;
}
