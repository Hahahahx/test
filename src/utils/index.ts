function debounce(fn: any, wait?: number) {
    wait === undefined && (wait = 200);
    let timer: any = null;
    return (...args: any) => {
        timer && clearTimeout(timer);
        timer = setTimeout(()=>fn(...args), wait);
    };
}

export { debounce };


//asasdassdsfalskfjalksj 