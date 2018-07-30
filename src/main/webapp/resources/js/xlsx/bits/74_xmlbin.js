function parse_wb(data, name/*:string*/, opts)/*:Workbook*/ {
	if(name.slice(-4)===".bin") return parse_wb_bin((data/*:any*/), opts);
	return parse_wb_xml((data/*:any*/), opts);
}

function parse_ws(data, name/*:string*/, opts, rels, wb)/*:Worksheet*/ {
	if(name.slice(-4)===".bin") return parse_ws_bin((data/*:any*/), opts, rels, wb);
	return parse_ws_xml((data/*:any*/), opts, rels, wb);
}

function parse_sty(data, name/*:string*/, opts) {
	if(name.slice(-4)===".bin") return parse_sty_bin((data/*:any*/), opts);
	return parse_sty_xml((data/*:any*/), opts);
}

function parse_theme(data, name/*:string*/, opts) {
	return parse_theme_xml(data, opts);
}

function parse_sst(data, name/*:string*/, opts)/*:SST*/ {
	if(name.slice(-4)===".bin") return parse_sst_bin((data/*:any*/), opts);
	return parse_sst_xml((data/*:any*/), opts);
}

function parse_cmnt(data, name/*:string*/, opts) {
	if(name.slice(-4)===".bin") return parse_comments_bin((data/*:any*/), opts);
	return parse_comments_xml((data/*:any*/), opts);
}

function parse_cc(data, name/*:string*/, opts) {
	if(name.slice(-4)===".bin") return parse_cc_bin((data/*:any*/), opts);
	return parse_cc_xml((data/*:any*/), opts);
}

function write_wb(wb, name/*:string*/, opts) {
	return (name.slice(-4)===".bin" ? write_wb_bin : write_wb_xml)(wb, opts);
}

function write_ws(data/*:Worksheet*/, name/*:string*/, opts, wb/*:Workbook*/) {
	return (name.slice(-4)===".bin" ? write_ws_bin : write_ws_xml)(data, opts, wb);
}

function write_sty(data, name/*:string*/, opts) {
	return (name.slice(-4)===".bin" ? write_sty_bin : write_sty_xml)(data, opts);
}

function write_sst(data/*:SST*/, name/*:string*/, opts) {
	return (name.slice(-4)===".bin" ? write_sst_bin : write_sst_xml)(data, opts);
}
/*
function write_cmnt(data, name:string, opts) {
	return (name.slice(-4)===".bin" ? write_comments_bin : write_comments_xml)(data, opts);
}

function write_cc(data, name:string, opts) {
	return (name.slice(-4)===".bin" ? write_cc_bin : write_cc_xml)(data, opts);
}
*/
