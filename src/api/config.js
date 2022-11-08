let url = null;

const LOCAL = 'localhost:9990';
const SERVER = '195.161.68.20:9990';
const LOCAL_NETWORK = '192.168.0.14:9990';

function mode(modeName) {
    url = modeName;
}

mode(LOCAL_NETWORK);//SELECT MODE!

export default url;