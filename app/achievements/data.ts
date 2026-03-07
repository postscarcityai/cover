import { siteConfig } from "@/site.config"

export interface CaseResult {
  id: string
  title: string
  charge: string
  jurisdiction: string
  date: string
  arrestedFor: string
  worstCase: string
  whatWasDone: string
  uniqueApproach: string
  actualResults: string
  category: 'federal' | 'state' | 'preventive'
  severity: 'high' | 'medium' | 'low'
}

export interface AdditionalResult {
  title: string
  charge: string
  result: string
  category: string
}

export interface ResultsData {
  breadcrumbSchema: {
    "@context": string
    "@type": string
    itemListElement: Array<{
      "@type": string
      position: number
      name: string
      item: string
    }>
  }
  hero: {
    title: string
    subtitle: string
    description: string
  }
  stats: {
    federal: {
      label: string
      title: string
      items: string[]
    }
    state: {
      label: string
      title: string
      items: string[]
    }
    postConviction: {
      label: string
      title: string
      items: string[]
    }
  }
  featuredResults: CaseResult[]
  additionalResults: AdditionalResult[]
  testimonial: {
    quote: string
    author: string
    title: string
  }
  cta: {
    title: string
    description: string
    buttonText: string
  }
}

export const resultsData: ResultsData = {
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.url
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Achievements",
        "item": `${siteConfig.url}/achievements`
      }
    ]
  },
  hero: {
    title: "Victories That Rewrite the Odds",
    subtitle: "Proven results across all practice areas",
    description: "Every case tells a story of strategic defense, relentless advocacy, and exceptional results. These are real cases with real outcomes that changed our clients' lives."
  },
  stats: {
    federal: {
      label: "Federal Crimes",
      title: "Complex Cases",
      items: [
        "Wire & Mail Fraud",
        "Drug Conspiracies",
        "Firearms Offenses",
        "Public Corruption"
      ]
    },
    state: {
      label: "State Felonies",
      title: "Serious Charges",
      items: [
        "Violent Crimes",
        "Theft & Fraud",
        "Sex Offenses",
        "Drug Crimes"
      ]
    },
    postConviction: {
      label: "Post-Conviction",
      title: "Second Chances",
      items: [
        "Sentence Modifications",
        "Probation Violations",
        "Appeals & Expungements"
      ]
    }
  },
  featuredResults: [
    {
      id: "state-v-aas-2024",
      title: "State v. A.A.S",
      charge: "DUI and Driving While License Suspended (DWLS)",
      jurisdiction: "Palm Beach County",
      date: "December 2024",
      arrestedFor: "DUI and Driving While License Suspended (DWLS)",
      worstCase: "1 year jail on each count (2 years total)",
      whatWasDone: "The defendant faced charges of Driving Under the Influence (DUI) and Driving While License Suspended (DWLS). The State initially offered a resolution of one year of probation and 30 days in jail.",
      uniqueApproach: "Through skilled negotiation, our firm successfully resolved the case for DUI minimums without any jail time, achieving an outcome significantly more favorable than the State's initial offer.",
      actualResults: "DUI minimums with no jail time, significantly better than initial offer of 30 days jail",
      category: 'state',
      severity: 'low'
    },
    {
      id: "state-v-jm-2024",
      title: "State v. J.M",
      charge: "Sexual Offender Registration Violations",
      jurisdiction: "Palm Beach County",
      date: "December 2024",
      arrestedFor: "Failure of Sexual Offender to Register and Providing False Information",
      worstCase: "48 months minimum prison sentence",
      whatWasDone: "The client faced two serious charges, including failure to register as a sexual offender and providing false information, with a minimum potential sentence of 48 months in prison.",
      uniqueApproach: "Developed comprehensive defense strategy to avoid prison sentence, successfully negotiating alternative to prison despite serious nature of charges and mandatory minimums.",
      actualResults: "Six months of community control (house arrest), avoiding any prison time",
      category: 'state',
      severity: 'high'
    },
    {
      id: "state-v-aa-2024",
      title: "State v. A.A",
      charge: "Grand Theft and Petit Theft",
      jurisdiction: "Martin County",
      date: "December 2024",
      arrestedFor: "Third-Degree Felony Grand Theft and First-Degree Misdemeanor Petit Theft",
      worstCase: "6 years prison, with potential for 11 years due to prior offenses",
      whatWasDone: "The client, charged with Grand Theft and Petit Theft, faced a daunting legal battle given an extensive history of arrests and prior prison sentences. The State initially offered a sentence of 54 months.",
      uniqueApproach: "Through strategic representation and an open plea to the court, our firm was able to avoid the Defendant being charged as a repeat offender warranting a 10-year prison term. Strategic open plea to court resulted in significantly reduced sentence.",
      actualResults: "18-month sentence, avoiding potential 11-year maximum and 54-month offer",
      category: 'state',
      severity: 'medium'
    },
    {
      id: "us-v-el-2021",
      title: "United States v. E.L",
      charge: "Wire Fraud (4 Counts)",
      jurisdiction: "Middle District of North Carolina",
      date: "2021",
      arrestedFor: "Wire Fraud involving logistics companies",
      worstCase: "20 years imprisonment and 3 years release on each count (potentially 80 years total)",
      whatWasDone: "A grand jury charged the defendant with devising a scheme to defraud two logistics companies by creating fraudulent shipper accounts to avoid paying shipping costs. The individual created fake accounts using the names of real companies without their knowledge, attempting to defraud companies out of more than 1.5 million dollars.",
      uniqueApproach: "Successfully argued for concurrent sentences and significant reduction despite high-value fraud involving multiple corporate victims and fraudulent activities spanning over a year.",
      actualResults: "34 months imprisonment and 3 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-ks-2016",
      title: "United States v. K.S",
      charge: "Conspiracy to Commit Wire Fraud",
      jurisdiction: "Southern District of Illinois (East St. Louis)",
      date: "2016",
      arrestedFor: "Tech support scam operation defrauding thousands of consumers through deceptive internet pop-ups and fraudulent sales tactics",
      worstCase: "30 years imprisonment and 5 years supervised release",
      whatWasDone: "The Defendant was employed by a tech support scam company that defrauded thousands of consumers through deceptive internet pop-ups and fraudulent sales tactics. The company falsely informed consumers of non-existent computer problems and convinced them to purchase unnecessary services and products. The individual worked as a salesperson and later as a team leader, instructing others in the fraudulent techniques. The scam operated from November 2013 to June 2016, defrauding over 40,000 people out of more than $25 million.",
      uniqueApproach: "Despite the massive scale of the fraud involving 40,000 victims and $25 million in losses, and the defendant's leadership role in instructing others in fraudulent techniques, counsel managed to secure an extraordinarily lenient sentence of just one day in prison.",
      actualResults: "1 Day Prison and 5 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-kh-2016",
      title: "United States v. K.H",
      charge: "Possession with Intent to Distribute Cocaine",
      jurisdiction: "Southern District of Florida (West Palm Beach)",
      date: "2016",
      arrestedFor: "Possession of More than 500 grams of cocaine with intent to distribute",
      worstCase: "20 Years imprisonment with 3 years supervised release",
      whatWasDone: "On March 4, 2016, Drug Enforcement Administration agents and Palm Beach County Sheriff's Office deputies executed a search warrant at a residence. Inside a safe, officers found approximately 1,997 grams of cocaine, cutting agents, drug packaging materials, drug paraphernalia, and $69,910 in United States currency. A loaded firearm was also found on a shelf in the same closet, above the safe.",
      uniqueApproach: "The defense team was able to get all gun charges dropped after extensive motion practice, significantly reducing potential sentence and demonstrating exceptional motion practice in federal court.",
      actualResults: "24 months imprisonment, 3 years of supervised release, avoiding additional firearms penalties",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-sb-2015",
      title: "United States v. S.B",
      charge: "Bank Fraud and Attempt and Conspiracy to Commit Mail Fraud",
      jurisdiction: "Southern District of Florida (Miami)",
      date: "2015",
      arrestedFor: "Complex mortgage fraud scheme involving bank fraud and conspiracy to commit mail fraud",
      worstCase: "30 years imprisonment on each count",
      whatWasDone: "In this complex mortgage fraud case, the client initially faced a sentence of 21 months of imprisonment and 5 years of supervised release. The team meticulously examined the government's evidence, identified areas for negotiation, and presented compelling arguments to mitigate sentencing through intensive negotiation, strategic analysis of discovery materials, and proactive engagement with the U.S. Attorney's Office.",
      uniqueApproach: "Recognizing the complexities of the case and the need to secure the best possible result, we successfully persuaded the government to file a motion under Rule 35 of the Federal Rules of Criminal Procedure, demonstrating exceptional skill in federal criminal defense strategy and post-sentencing advocacy.",
      actualResults: "Initial 21-month sentence reduced to 14 months with concurrent sentences on all counts via Rule 35 motion",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-rm-2015",
      title: "United States v. R.M",
      charge: "Coercion or Enticement of Female",
      jurisdiction: "Southern District of Florida (West Palm Beach)",
      date: "2015",
      arrestedFor: "Attempted coercion and enticement of a minor for sexual activity",
      worstCase: "Life imprisonment with 10-year minimum mandatory",
      whatWasDone: "Defendant was caught in undercover operation using private messenger service to contact who they believed was a minor, arriving with items intended for sexual activity.",
      uniqueApproach: "Successfully negotiated for minimum sentence despite serious nature of charges and presence of physical evidence.",
      actualResults: "10 years imprisonment with 5 years supervised release, avoiding potential life sentence",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-wr-2015",
      title: "United States v. W.R",
      charge: "Possession of Controlled Substance",
      jurisdiction: "Southern District of Florida (West Palm Beach)",
      date: "2015",
      arrestedFor: "Possession with intent to distribute, attempted possession with intent to distribute, and conspiracy to possess with intent to distribute 500 grams or more of cocaine",
      worstCase: "5-40 years on each count",
      whatWasDone: "Defendant was arrested in undercover operation for possession of two kilograms of cocaine after negotiating purchase.",
      uniqueApproach: "Successfully argued for minimum sentence despite multiple charges and significant drug quantity.",
      actualResults: "5 years imprisonment and 4 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-ja-2015",
      title: "United States v. J.A",
      charge: "Coercion or Enticement of Minor",
      jurisdiction: "Southern District of Florida (Middle District)",
      date: "2015",
      arrestedFor: "Attempted coercion and enticement of minor",
      worstCase: "Life in Prison",
      whatWasDone: "Defendant attempted to solicit a minor for sexual purposes using a dating app. Counsel negotiated plea agreement for twelve years, though judge rejected the negotiated low end of guidelines.",
      uniqueApproach: "Successfully used PSR objections and persuasive arguments to prevent life sentence, despite rejection of initial plea agreement.",
      actualResults: "20 Years and supervised release for life, avoiding potential life imprisonment",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-tr-2014",
      title: "United States v. T.R",
      charge: "Conspiracy to Possess with Intent to Distribute Cocaine",
      jurisdiction: "Southern District of Florida (Ft. Pierce)",
      date: "2014",
      arrestedFor: "Conspiracy to possess with intent to distribute 500 grams or more of cocaine",
      worstCase: "40 Years imprisonment with mandatory minimum of 10 years",
      whatWasDone: "In June 2014, a DEA informant was contacted by an uncharged co-conspirator seeking a cocaine supplier. An undercover detective arranged a meeting with the defendant, who expressed interest in buying cocaine and heroin. Subsequent recorded conversations led to a meeting where the defendant agreed to purchase cocaine and proposed trading other drugs for additional cocaine. On July 11, 2014, the defendant and an accomplice met with undercover detectives to complete the transaction, where the defendant was arrested after attempting to flee.",
      uniqueApproach: "Successfully argued for dramatic sentence reduction from initial 10-year mandatory minimum sentence, demonstrating exceptional negotiation skills in federal drug cases involving mandatory minimums.",
      actualResults: "10 Years imprisonment, Modified to: 27 Months with supervised release for a term of 5 months",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-ar-2012",
      title: "United States v. A.R",
      charge: "Internet Pharmacy Conspiracy",
      jurisdiction: "Southern District of New York (Foley Square)",
      date: "2010-2012",
      arrestedFor: "Conspiracy to Distribute Narcotics, Narcotics - Sell, Distribute, or Dispense via the Internet, Conspiracy to Commit Misbranding, Money Laundering, Conspiracy to Engage in Structuring",
      worstCase: "Up to 108 years if served consecutively",
      whatWasDone: "This indictment involved multiple defendants charged with participating in an illegal internet pharmacy scheme from 2010 to 2012. The scheme involved selling, distributing, and dispensing prescription drugs over the internet without valid prescriptions. Customers ordered drugs like Fioricet, Soma, and Ultram through websites without consulting a physician, making the prescriptions invalid.",
      uniqueApproach: "Successfully negotiated an extraordinary outcome in a complex multi-defendant internet pharmacy case involving serious federal drug and money laundering charges, avoiding decades of potential imprisonment.",
      actualResults: "Time Served, Supervised Release for 18 months",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-pn-2012",
      title: "United States v. P.N",
      charge: "Importing/Manufacturing of Firearms",
      jurisdiction: "Southern District of Florida (West Palm Beach)",
      date: "2012",
      arrestedFor: "Making false statements to acquire firearms and international weapons trafficking",
      worstCase: "10 years imprisonment and 3 years supervised release",
      whatWasDone: "Defendant purchased multiple firearms with intent to traffic to Haiti, making false statements on federal forms. Caught during traffic stop with ten Glock 19 pistols.",
      uniqueApproach: "Successfully negotiated significant reduction in sentence despite international weapons trafficking implications.",
      actualResults: "1 year prison and 2 years supervised release",
      category: 'federal',
      severity: 'medium'
    },
    {
      id: "us-v-sa-2011",
      title: "United States v. S.A",
      charge: "Marijuana Distribution",
      jurisdiction: "Western District of Texas (El Paso)",
      date: "2011",
      arrestedFor: "Marijuana Sell/Distribute/Dispense 40 Kilos (88 lbs)",
      worstCase: "5 Years imprisonment",
      whatWasDone: "On November 30, 2011, Border Patrol agents at a checkpoint in Sierra Blanca, Texas, conducted a canine inspection of a vehicle driven by the defendant. The canine alerted to the presence of drugs, leading agents to discover 88 pounds of marijuana concealed in vacuum-sealed bags within the vehicle. The defendant admitted to transporting the marijuana from California to Florida in exchange for money, citing financial hardship as motivation.",
      uniqueApproach: "Successfully argued for probation in lieu of imprisonment despite significant drug quantity (88 pounds), emphasizing client's circumstances and financial hardship in a case involving interstate drug trafficking.",
      actualResults: "3 years non-reporting probation, 6 months home confinement",
      category: 'federal',
      severity: 'medium'
    },
    {
      id: "us-v-ds-2005",
      title: "United States v. D.S",
      charge: "Conspiracy to Commit Wire Fraud",
      jurisdiction: "Southern District of Florida (Miami)",
      date: "2005",
      arrestedFor: "Participated as a straw buyer in a mortgage fraud scheme involving a property in Miami Beach, Florida",
      worstCase: "20 Years imprisonment",
      whatWasDone: "In July 2005, an individual participated as a straw buyer in a mortgage fraud scheme involving a property in Miami Beach, Florida. Loan applications submitted on their behalf contained materially false information regarding assets, employment, and intentions to occupy the property. The individual did not provide a down payment or intend to live in the property but received payment for their involvement. The scheme resulted in the lender incurring significant losses, with fraud damages exceeding $400,000.",
      uniqueApproach: "Successfully negotiated minimal sentence in complex mortgage fraud case involving substantial financial losses and federal wire transfers across state lines.",
      actualResults: "4 months imprisonment followed by 3 years supervised release",
      category: 'federal',
      severity: 'medium'
    },
    {
      id: "us-v-rj-2010",
      title: "United States v. R.J",
      charge: "Conspiracy to Commit Mail Fraud",
      jurisdiction: "Southern District of Illinois (East St. Louis)",
      date: "2010",
      arrestedFor: "Timeshare resale fraud targeting elderly victims",
      worstCase: "20 years imprisonment and 3 years release on each count",
      whatWasDone: "Defendant collected over $282,000 from 141 consumers through Creative Vacation Solutions timeshare resale scam, primarily targeting elderly individuals.",
      uniqueApproach: "Successfully mitigated sentence despite aggravating factors of elderly victims and high fraud amount.",
      actualResults: "46 months imprisonment and 2 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-ss-2009",
      title: "United States v. SS",
      charge: "Conspiracy to Commit Mail Fraud",
      jurisdiction: "Southern District of Illinois (East St. Louis)",
      date: "2009",
      arrestedFor: "Fraudulent telemarketing timeshare resale scheme targeting elderly victims.",
      worstCase: "20 years imprisonment and 2 years supervised release",
      whatWasDone: "The defendant participated in a complex telemarketing fraud scheme involving false promises, misrepresentations, and deceptive business fronts. The operation used fabricated offers and fees to defraud victims across multiple states.",
      uniqueApproach: "Successfully argued for a sentence reduction motion, demonstrating exceptional post-conviction advocacy.",
      actualResults: "Initial sentence of 48 months imprisonment reduced to 18 months upon motion to the court, with 2 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-jd-2008",
      title: "United States v. JD (Deputy Case)",
      charge: "Conspiracy to Commit Extortion and Drug Distribution",
      jurisdiction: "Southern District of Florida (West Palm Beach)",
      date: "2008",
      arrestedFor: "A Broward County Sheriff's Deputy charged with conspiracy to commit extortion under color of official right and conspiracy to possess with intent to distribute cocaine.",
      worstCase: "Life imprisonment with 10-year minimum mandatory",
      whatWasDone: "Deputy was accused of providing countersurveillance for a drug transport operation involving 100 kilos of cocaine and receiving $3,000 for their role. Case involved complex undercover FBI operations and recorded conversations.",
      uniqueApproach: "Successfully navigated a high-profile case involving law enforcement corruption and substantial drug quantities, achieving a sentence well below potential life imprisonment.",
      actualResults: "100 months imprisonment with 3 years supervised release",
      category: 'federal',
      severity: 'high'
    },
    {
      id: "us-v-rb-2008",
      title: "United States v. R.B",
      charge: "Possession of Controlled Substance (Oxycodone)",
      jurisdiction: "Southern District of Florida (Ft. Lauderdale)",
      date: "2008",
      arrestedFor: "Possession of Controlled Substance (Sell/Distribute/Dispense) (Oxycodone)",
      worstCase: "20 years imprisonment and 3 years release on each count",
      whatWasDone: "Multiple defendants charged in conspiracy to possess and distribute oxycodone in Broward County.",
      uniqueApproach: "Successfully negotiated significant reduction in sentence through effective plea negotiations in multi-defendant case.",
      actualResults: "16 months imprisonment and 3 years supervised release",
      category: 'federal',
      severity: 'medium'
    }
  ],
  additionalResults: [
    {
      title: "United States v. R.J",
      charge: "Conspiracy to Commit Mail Fraud",
      result: "46 months imprisonment (from potential 20 years)",
      category: "Fraud"
    },
    {
      title: "United States v. K.H",
      charge: "Possession with Intent to Distribute Cocaine",
      result: "24 months imprisonment, gun charges dropped",
      category: "Drug Crimes"
    },
    {
      title: "United States v. R.M",
      charge: "Coercion or Enticement of Female",
      result: "10 years imprisonment (avoided life sentence)",
      category: "Sex Crimes"
    },
    {
      title: "United States v. S.A",
      charge: "Marijuana Distribution (88 lbs)",
      result: "3 years probation, 6 months home confinement",
      category: "Drug Crimes"
    },
    {
      title: "State v. A.A.S",
      charge: "DUI and DWLS",
      result: "DUI minimums with no jail time",
      category: "Traffic"
    }
  ],
  testimonial: {
    quote: "Results speak louder than promises. When facing serious challenges, you need a team with a proven track record of turning worst-case scenarios into favorable outcomes.",
    author: siteConfig.business.founder.name,
    title: siteConfig.business.founder.title
  },
  cta: {
    title: "Your Case Could Be Our Next Success Story",
    description: "Don't let criminal charges define your future. With over 30 years of proven results, we know how to fight for the best possible outcome in your case.",
    buttonText: "Get Your Free Consultation"
  }
}
