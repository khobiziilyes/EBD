export const firstGroup = (text, pattern) => text.match(pattern)[1];
export const firstGroupAll = (text, pattern) => [...text.matchAll(pattern)].map(_ => _[1]);

export function splitArr(arr, size) {
	let arrayOfArrays = [];
	
	for (let i = 0; i < arr.length; i += size) 
		arrayOfArrays.push(arr.slice(i, i + size));
	
	return arrayOfArrays;
}