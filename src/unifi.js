import { execaCommand } from 'execa';

export async function getUnifiDeviceData() {
  const { stdout } = await execaCommand(
    `data='{"username":"${process.env.UNIFI_CONTROLLER_USERNAME}","password":"${process.env.UNIFI_CONTROLLER_PASSWORD}"}'; ip='https://${process.env.UNIFI_CONTROLLER_HOST}:443';\
    c=$(curl -H 'Content-Type: application/json' -d $data -ksc - $ip/api/auth/login -o /dev/null);\
    echo "\${c}" | curl -ksb - $ip/proxy/network/api/s/default/stat/device/`, { shell: true }
  );
  return JSON.parse(stdout);
}
