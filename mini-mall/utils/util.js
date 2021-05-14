export function throttle(fn, delay = 1000){
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
};

export function debounce(func,delay){
	let timer = null
	return function(...args){	
		if(timer) clearTimeout(timer)
		timer = setTimeout(() => {
			func.apply(this,args)
		},delay)
	}
}