const express=require("express");
const ip="192.168.0.103";  // hosting machine ip my laptop

const localNetworkIPRangeStart = '192.168.0.100';
const localNetworkIPRangeEnd = '192.168.0.200';


const localNetworkIPRange = '192.168.0.100'; // Change this to match your network

//Middleware to check if the request is coming from the local Wi-Fi network
const IP_rangemiddleware =((req, res, next) => {
    const requesterIP = req.ip; // Get the IP address of the requester
    console.log('Requester IP:', requesterIP);

    // Convert IP address string to integer for comparison
    const requesterIPInt = ipToInt(requesterIP);
    const rangeStartInt = ipToInt(localNetworkIPRangeStart);
    const rangeEndInt = ipToInt(localNetworkIPRangeEnd);

    // Check if the requester's IP address is within the specified range
    if (requesterIPInt >= rangeStartInt && requesterIPInt <= rangeEndInt) {
        console.log("in range ");
        next();
    } else {
        // Deny access if the requester's IP address is not within the local network range
        res.status(403).send('Access Forbidden');
    }
});

// Function to convert IP address string to integer representation
function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

module.exports={IP_rangemiddleware};