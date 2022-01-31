export async function sleep(ms: number) {
    return new Promise<void>((res) => setTimeout(res, ms));
}

export const devconfig = `########################################
#                                      #
#         PEPE SELFBOT CONFIG          #
#                                      #
########################################

LicenseKey: "LICENSEKEY"
SelfBotUserID: "000000000000000000"
OwnerUserID: "000000000000000000"
BankUserID: "000000000000000000"

General:
    HasBank: true                      # If you use an alt to store the money in say true
    ButtonInterval: 500                 # Time in milliseconds before clicking a button (min. = 500ms)
    SaveMode: true                      # If you don't want to run commands that *might* kill you (like search)

Commands: # Timeout is in seconds
    Beg:
      Enabled: true
      Timeout: 10
    Dig:
      Enabled: true
      Timeout: 10
    Fish:
      Enabled: true
      Timeout: 10
    Hunt:
      Enabled: true
      Timeout: 10
    Pet:
      Enabled: true
      Timeout: 10
    PostMemes:
      Enabled: true
      Timeout: 10
    Stream:
      Enabled: true
      Timeout: 10
    Work:
      Enabled: true
      Timeout: 10
# Claimable Money
    Daily:
      Enabled: true
      Timeout: 10
    Weekly: # For dank memer patreons
      Enabled: false
      Timeout: 10
    Monthly: 
      Enabled: true
      Timeout: 10
    Dep:
      Enabled: true
      Timeout: 10
# Gambling Commands
    HighLow:
      Enabled: true
      Timeout: 10
    BlackJack:
      Enabled: true
      Timeout: 10`;