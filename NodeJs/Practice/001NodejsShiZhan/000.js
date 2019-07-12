function Test() {
    this.name='xuhao456';
}



exports.test=function(){
    return 'xuhao';
}

exports.Test=Test;

module.exports.test=function(){
    return 'xuhao123';
}