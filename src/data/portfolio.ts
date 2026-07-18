export const profile = {
  name: 'Akash Kolhe',
  role: 'Cloud & DevOps Engineer',
  location: 'Pune, India',
  email: 'akashkolhe021@gmail.com',
  phone: '+91 9763978679',
  github: 'https://github.com/akashkolhe',
  linkedin: 'https://www.linkedin.com/in/akashkolhe1/',
  githubUsername: 'akashkolhe',
  resume: '/resume/akash-kolhe-resume.pdf',
  availability: 'Open to Cloud & DevOps opportunities',
};

export const experience = [
  {
    role: 'AWS & DevOps Engineer Intern',
    company: 'Genie US Tech',
    location: 'Pune, India',
    period: 'Apr 2026 — Present',
    bullets: [
      'Administer Linux workloads on Amazon Linux and Ubuntu, covering server setup, users, packages, and command-line operations.',
      'Use CloudWatch alerts and incident-management practices to maintain reliable, observable infrastructure.',
      'Configure EC2, IAM, S3, Auto Scaling, load balancers, security groups, DNS, and connectivity for scalable AWS environments.',
    ],
  },
  {
    role: 'Cloud Engineer',
    company: 'Digitalzone Media Private Limited',
    location: 'Pune, India',
    period: 'Sep 2023 — Apr 2026',
    bullets: [
      'Configured and administered Linux servers on AWS, with practical ownership of setup, access, packages, and operations.',
      'Partnered with cross-functional teams to troubleshoot server issues, debug production problems, and improve reliability.',
      'Used Git and agile delivery practices for change management, issue resolution, and iterative releases.',
    ],
  },
];

export const featuredProjects = [
  {
    title: 'Production-Ready 3-Tier Web Application',
    type: 'Architecture',
    summary: 'A highly available AWS application architecture with network isolation, Aurora, load balancing, monitoring, and cost controls.',
    impact: 'Designed for 99.9% availability and 60–70% projected cost reduction through rightsizing and idle-resource review.',
    stack: ['AWS', 'VPC', 'RDS Aurora', 'ALB', 'CloudWatch'],
    accent: 'from-blue-500/20 via-cyan-300/10 to-transparent',
  },
  {
    title: 'Infrastructure Automation with Terraform & Ansible',
    type: 'Automation',
    summary: 'Repeatable provisioning of an Ansible control node and three managed Ubuntu EC2 instances, followed by Nginx deployment.',
    impact: 'Centralized configuration management for consistent server state and less manual intervention.',
    stack: ['Terraform', 'Ansible', 'AWS', 'Nginx'],
    accent: 'from-violet-500/20 via-blue-400/10 to-transparent',
  },
  {
    title: 'VPC Peering with Terraform',
    type: 'Networking',
    summary: 'Terraform-managed VPC peering architecture with subnets, route tables, internet gateways, and security groups.',
    impact: 'Validated secure private communication between isolated AWS network environments.',
    stack: ['Terraform', 'AWS', 'VPC Peering', 'EC2'],
    accent: 'from-cyan-400/20 via-emerald-300/10 to-transparent',
  },
  {
    title: 'Load Balancer Configuration for Web Applications',
    type: 'Reliability',
    summary: 'Traffic distribution using ELB/ALB integrated with EC2 Auto Scaling and CloudWatch monitoring.',
    impact: 'Improved fault tolerance and response behavior for dynamic application traffic.',
    stack: ['AWS', 'ALB', 'ELB', 'EC2', 'Auto Scaling'],
    accent: 'from-sky-400/20 via-indigo-400/10 to-transparent',
  },
];

export const skillGroups = [
  { title: 'Cloud platform', skills: ['AWS', 'EC2', 'VPC', 'S3', 'IAM', 'RDS', 'Lambda', 'CloudFront', 'Route 53'] },
  { title: 'Infrastructure & delivery', skills: ['Terraform', 'Ansible', 'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'] },
  { title: 'Linux & networking', skills: ['Linux', 'Bash', 'Nginx', 'Apache', 'Security Groups', 'DNS', 'Load Balancing'] },
  { title: 'Observability', skills: ['CloudWatch', 'Prometheus', 'Grafana', 'Log Analysis', 'RCA'] },
];

export const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issued: 'Issued Jun 25, 2026',
    expires: 'Valid until Jun 25, 2029',
    id: '757b35ca16084efe877edfa3d09d660f',
    file: '/certificates/aws-solutions-architect-associate.pdf',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issued: 'Issued Oct 25, 2023',
    expires: 'Valid until Oct 25, 2026',
    id: 'DBTC7V9K011413WW',
    file: '/certificates/aws-cloud-practitioner.pdf',
  },
];

export const navigation = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Credentials', '#credentials'],
  ['Contact', '#contact'],
] as const;
