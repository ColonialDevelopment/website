export function match (item, query_text){
	return item.toLowerCase().includes(query_text.toLowerCase());
}