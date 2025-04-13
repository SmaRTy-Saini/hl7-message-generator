
function generateHL7() {
    const msgType = document.getElementById("messageType").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const mrn = document.getElementById("mrn").value;
    const dob = document.getElementById("dob").value;
    const sex = document.getElementById("sex").value;
    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);

    const msh = `MSH|^~\\&|TestApp|Facility|Receiver|System|${timestamp}||${msgType}|12345|P|2.3`;
    const pid = `PID|||${mrn}^^^MR||${lastName}^${firstName}||${dob}|${sex}`;

    let pv1 = "", orc = "", obr = "";
    if (msgType === "ADT^A01") {
        pv1 = "PV1||I|W^101^1^A";
    } else if (msgType === "ORM^O01") {
        orc = "ORC|NW|1234^OrderPlacer";
        obr = "OBR|1|1234^OrderPlacer||TEST^Test Procedure";
    }

    const hl7 = [msh, pid, pv1, orc, obr].filter(Boolean).join("\n");
    document.getElementById("hl7Output").value = hl7;
}
