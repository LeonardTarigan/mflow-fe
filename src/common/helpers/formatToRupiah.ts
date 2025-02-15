 const formatToRupiah =(num: number) => {
  return `Rp ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

export default formatToRupiah