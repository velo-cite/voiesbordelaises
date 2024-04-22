export const useColors = () => {
  function getLineColor(line: number): string {
    const colors = new Map();
    colors.set(1, '#2f780b');
    colors.set(2, '#1ce8de');
    colors.set(3, '#e3af95');
    colors.set(4, '#746040');
    colors.set(5, '#1c77b7');
    colors.set(6, '#fff6fd');
    colors.set(7, '#ae03ff');
    colors.set(8, '#e743b1');
    colors.set(9, '#fb7d22');
    colors.set(10, '#dde03a');
    colors.set(11, '#b8319d');
    colors.set(12, '#e14351');
    colors.set(13, '#a0a0a0');
    colors.set(14, '#40ca46');
    return colors.get(line);
  }

  return { getLineColor };
};
