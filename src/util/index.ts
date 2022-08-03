import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export async function sleep(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms));
}

export function config(): Configuration {
  const CONFIG_FILEPATH = path.join(__dirname, '../../config.yml');

  const file = fs.readFileSync(CONFIG_FILEPATH, 'utf8');
  const config = YAML.parse(file);
  return config;
}

export type Configuration = {
  LicenseKey: string;
  Prefix: string;
  SelfBotUserID: string;
  OwnerUserID: string;
  BankUserID: string;
  General: {
    HasBank: boolean;
    ButtonInterval: number;
    SaveMode: boolean;
  };
  Commands: {
    StartCommand: string,
    StopCommand: string,
    Beg: {
      Enabled: boolean;
      Timeout: number;
    },
    Dig: {
      Enabled: boolean;
      Timeout: number;
    },
    Fish: {
      Enabled: boolean;
      Timeout: number;
    },
    Hunt: {
      Enabled: boolean;
      Timeout: number;
    },
    Pet: {
      Enabled: boolean;
      Timeout: number;
    },
    PostMemes: {
      Enabled: boolean;
      Timeout: number;
    },
    Stream: {
      Enabled: boolean;
      Timeout: number;
    },
    Work: {
      Enabled: boolean;
      Timeout: number;
    },
    Daily: {
      Enabled: boolean;
      Timeout: number;
    },
    Weekly: {
      Enabled: boolean;
      Timeout: number;
    },
    Monthly: {
      Enabled: boolean;
      Timeout: number;
    },
    Dep: {
      Enabled: boolean;
      Timeout: number;
    },
    HighLow: {
      Enabled: boolean;
      Timeout: number;
    },
    BlackJack: {
      Enabled: boolean;
      Timeout: number;
    };
  };
};

export const devconfig = `########################################
#                                      #
#         PEPE SELFBOT CONFIG          #
#                                      #
########################################

LicenseKey: "LICENSEKEY"
Prefix: "$"
SelfBotUserID: "000000000000000000"
OwnerUserID: "000000000000000000"
BankUserID: "000000000000000000"

General:
    HasBank: true                      # If you use an alt to store the money in say true
    ButtonInterval: 500                 # Time in milliseconds before clicking a button (min. = 500ms)
    SaveMode: true                      # If you don't want to run commands that *might* kill you (like search)

Commands: # Timeout is in seconds
    StartCommand: "start"
    StopCommand: "stop"
    Beg:
      Enabled: true
      Timeout: 45_000
    Dig:
      Enabled: true
      Timeout: 40000
    Fish:
      Enabled: true
      Timeout: 40000
    Hunt:
      Enabled: true
      Timeout: 40000
    Pet:
      Enabled: true
      Timeout: 900000
    PostMemes:
      Enabled: true
      Timeout: 45_000
    Stream:
      Enabled: true
      Timeout: 900000
    Work:
      Enabled: true
      Timeout: 36000000
    Give:
      Enabled: true
      Timeout: 45_000
    Dep:
      Enabled: true
      Timeout: 120_000
# Claimable Money
    Daily:
      Enabled: true
      Timeout: 86400010
    Weekly: # For dank memer patreons
      Enabled: false
      Timeout: 604800010
    Monthly: 
      Enabled: true
      Timeout: 1728000010
# Gambling Commands
    HighLow:
      Enabled: true
      Timeout: 30000
    BlackJack:
      Enabled: true
      Timeout: 10`;